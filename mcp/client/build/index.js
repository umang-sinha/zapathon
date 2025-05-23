import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import * as dotenv from 'dotenv';
import OpenAI from "openai";
dotenv.config();
const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "";
const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;
console.log("HELo world");
console.log({
    OPENROUTER_API_KEY,
    OPENROUTER_MODEL,
    OPENROUTER_API_URL
});
const openaiClient = new OpenAI({
    apiKey: OPENROUTER_API_KEY,
    // baseURL: OPENROUTER_API_URL,
});
const convertMCPToolToOpeanAITool = (mcpTool) => {
    return {
        type: "function",
        function: {
            name: mcpTool.name,
            description: mcpTool.description,
            parameters: mcpTool.inputSchema,
        },
    };
};
let mcpClient;
let chatHistory = [];
const initMcpClient = async () => {
    try {
        const transport = new StdioClientTransport({
            command: "bash",
            args: ["-c", "cd '../server/build' && node index.js"],
        });
        const client = new Client({
            name: "mcp-client",
            version: "1.0.0",
        });
        console.log("Attempting to connect to local MCP server");
        await client.connect(transport);
        mcpClient = client;
        console.log("Local MCP server connected successfully");
        const availableMCPTools = await mcpClient.listTools();
        console.log("Available MCP Tools:", availableMCPTools.tools.map((t) => t.name).join(", "));
        chatHistory.push({
            role: "system",
            content: `Local MCP server connected. Available tools: ${availableMCPTools.tools
                .map((t) => t.name)
                .join(", ")}`,
        });
    }
    catch (error) {
        console.error("ERROR: Failed to connect to local MCP server:", error.message);
        console.error("Please ensure:");
        console.error("  1. Your MCP server is correctly built and 'index.js' exists in its 'build' directory.");
        console.error("  2. The relative path in 'SERVER_ROOT_DIR_RELATIVE_TO_CLIENT' is correct.");
        console.error("  3. 'node' (or the specified NODE_EXECUTABLE_PATH) is accessible in your WSL environment's PATH.");
        console.error("  4. Your MCP server does not print non-JSON output to stdout during startup (use console.error for logs).");
        process.exit(1); // Exit if MCP client cannot connect
    }
};
const processMessage = async (userInput) => {
    if (!userInput.trim())
        return;
    if (!mcpClient) {
        console.log("MCP client not connected yet. Please wait.");
        return;
    }
    if (!OPENROUTER_API_KEY) {
        console.log("Please set the OPENROUTER_API_KEY environment variable.");
        return;
    }
    chatHistory = [];
    const userMessage = {
        role: "user",
        content: userInput,
    };
    console.log(`\nUser: ${userInput}`);
    chatHistory.push(userMessage);
    try {
        // Get tools from local MCP server and convert to OpenAI format
        const mcpTools = await mcpClient.listTools();
        const openAITools = mcpTools.tools.map(convertMCPToolToOpeanAITool);
        // First call to OpenRouter with tools using OpenAI package
        console.log("Sending request to OpenRouter (using OpenAI package)...");
        console.log(chatHistory);
        console.log({ openAITools: openAITools[0].function });
        const completion = await openaiClient.chat.completions.create({
            model: OPENROUTER_MODEL,
            messages: chatHistory,
            tools: openAITools,
            tool_choice: "auto",
            // OpenRouter specific headers can be passed via the 'extra_headers' option
            // However, for CLI usage, these are often not strictly necessary unless for logging/analytics on OpenRouter's side
            // extra_headers: {
            //   'HTTP-Referer': 'https://your-cli-app.com',
            //   'X-Title': 'OpenRouter MCP CLI Demo',
            // },
        });
        const assistantMessage = completion.choices[0].message;
        chatHistory.push(assistantMessage); // Add assistant's response to history
        // Check if the model wants to call a tool
        if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
            console.log("data - ");
            console.log(assistantMessage.tool_calls);
            const toolCall = assistantMessage.tool_calls[0]; // Assuming one tool call for simplicity
            const functionName = toolCall.function.name;
            const functionArgs = JSON.parse(toolCall.function.arguments);
            console.log(`\nAssistant: Model requested tool: ${functionName} with args: ${JSON.stringify(functionArgs)}`);
            try {
                // Execute the tool using the local MCP client
                const toolResult = await mcpClient.callTool({
                    name: functionName,
                    arguments: functionArgs
                });
                console.log("Tool execution result:", toolResult);
                // Add tool output to chat history and send back to OpenRouter
                const toolMessage = {
                    role: "tool",
                    tool_call_id: toolCall.id,
                    content: JSON.stringify(toolResult), // Tool output must be a string
                };
                // Add tool output to chat history
                chatHistory.push(toolMessage);
                // Second call to OpenRouter with tool results using OpenAI package
                console.log("Sending tool result back to OpenRouter (using OpenAI package)...");
                const secondCompletion = await openaiClient.chat.completions.create({
                    model: OPENROUTER_MODEL,
                    messages: chatHistory,
                    tools: openAITools, // Still provide tools for context
                });
                const finalAssistantMessage = secondCompletion.choices[0].message;
                chatHistory.push(finalAssistantMessage);
                console.log(`\nAssistant: ${finalAssistantMessage.content}`);
            }
            catch (toolError) {
                console.error("ERROR: Error executing tool or sending tool result:", toolError.message);
            }
        }
        else {
            // If no tool call, just display the assistant's message
            console.log(`\nAssistant: ${assistantMessage.content}`);
        }
    }
    catch (error) {
        console.error("ERROR: Error communicating with OpenRouter:", error.message);
    }
};
const run = async () => {
    await initMcpClient();
    await processMessage('divide 4 by 2');
};
const test = async () => {
    console.log("Making a simple non-tooling request to test basic connectivity...");
    try {
        const completion = await openaiClient.chat.completions.create({
            model: OPENROUTER_MODEL, // Use your currently set model
            messages: [{ role: "user", content: "Hello, what is your purpose?" }],
        });
        console.log("\nAssistant (Simple Test):", completion.choices[0].message.content);
    }
    catch (error) {
        console.error("ERROR: Simple OpenRouter test failed:", error.message);
    }
};
run();
