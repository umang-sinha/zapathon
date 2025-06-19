import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
  FunctionParameters,
} from "openai/src/resources.js";
import * as dotenv from "dotenv";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

dotenv.config();

interface IMcpTool {
  name: string;
  description: string;
  inputSchema: object;
}

export class MCPClient {
  ApiKey: string;
  Model: string;
  McpClient: Client | null = null;
  OpenAIClient: OpenAI;
  ChatHistory: ChatCompletionMessageParam[] = [];
  Tools: ChatCompletionTool[] = [];

  constructor() {
    this.ApiKey = process.env.OPENAI_API_KEY || "";
    this.Model = process.env.OPENAI_MODEL || "";
    this.OpenAIClient = new OpenAI({
      apiKey: this.ApiKey,
    });
  }

  async Init() {
    await this.InitMCPClient();
    if (this.McpClient == null) {
      throw new Error("Mcp Client not connected");
    }
    const availableMCPTools = await this.McpClient.listTools();
    this.Tools = (availableMCPTools.tools as IMcpTool[]).map(
      this.ConvertMCPToolToOpenAITool
    );
    this.SetDefaultMessages();
  }

  async InitMCPClient() {
    const transport = new StdioClientTransport({
      command: "bash",
      args: ["-c", "cd '../server/build' && node index.js"],
    });

    const mcpClient: Client = new Client({
      name: "mcp-client",
      version: "1.0.0",
    });

    await mcpClient.connect(transport);
    this.McpClient = mcpClient;
  }

  async ProcessMessage(userInput: string) {
    if (!userInput.trim()) return;
    if (!this.McpClient) {
      console.log("MCP client not connected yet. Please wait.");
      return;
    }

    const userMessage: ChatCompletionMessageParam = {
      role: "user",
      content: userInput,
    };
    console.log(`\nUser: ${userInput}`);
    this.ChatHistory.push(userMessage);

    try {
      // Get tools from local MCP server and convert to OpenAI format
      console.log("Sending request to LLM (using OpenAI package)...");
      const completion = await this.OpenAIClient.chat.completions.create({
        model: this.Model,
        messages: this.ChatHistory,
        tools: this.Tools,
        tool_choice: "auto",
      });

      const assistantMessage = completion.choices[0].message;
      this.ChatHistory.push(assistantMessage); // Add assistant's response to history

      // Check if the model wants to call a tool
      if (
        assistantMessage.tool_calls &&
        assistantMessage.tool_calls.length > 0
      ) {
        //  TODO: Update such that it handles multiple tool calls
        const toolCall = assistantMessage.tool_calls[0];
        const functionName = toolCall.function.name;

        const functionArgs = JSON.parse(toolCall.function.arguments);

        console.log(
          `\nAssistant: Model requested tool: ${functionName} with args: ${JSON.stringify(
            functionArgs
          )}`
        );

        try {
          const toolResult = await this.McpClient.callTool({
            name: functionName,
            arguments: functionArgs,
          });
          console.log("Tool execution result:", toolResult.toolResult);
          const toolMessage: ChatCompletionMessageParam = {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult), // Tool output must be a string
          };

          // Add tool output to chat history
          this.ChatHistory.push(toolMessage);

          // Second call to OpenRouter with tool results using OpenAI package
          console.log(
            "Sending tool result back to LLM (using OpenAI package)..."
          );
          const secondCompletion =
            await this.OpenAIClient.chat.completions.create({
              model: this.Model,
              messages: this.ChatHistory,
              tools: this.Tools, // Still provide tools for context
            });

          const finalAssistantMessage = secondCompletion.choices[0].message;
          this.ChatHistory.push(finalAssistantMessage);
            console.log(`\nAssistant: ${finalAssistantMessage.content}`);
            return finalAssistantMessage.content
        } catch (toolError: any) {
          console.error(
            "ERROR: Error executing tool or sending tool result:",
            toolError.message
          );
        }
      } else {
        // If no tool call, just display the assistant's message
        console.log(`\nAssistant: ${assistantMessage.content}`);
        return assistantMessage.content;
      }
    } catch (error: any) {
      console.error("ERROR: Error communicating with OpenAI:", error.message);
    }
  }

  SetDefaultMessages() {
    this.ChatHistory = [];
    this.ChatHistory.push({
      role: "system",
      content: `Local MCP server connected. Available tools: ${this.Tools.map(
        (t: ChatCompletionTool) => t.function.name
      ).join(", ")}`,
    });
    this.ChatHistory.push({
      role: "system",
      content:
        "You are a sales tool designed for the company Zapcom. Zapcom is a technology solutions provider specializing in driving innovation, scalability, and efficiency across the BFSI, Retail, Travel, Hospitality, and Airline sectors. Their comprehensive capabilities include enabling digital-first customer experiences, building next-gen financial infrastructure, ensuring compliance and risk management, and leveraging financial intelligence through advanced analytics for the BFSI sector. For Retail, Zapcom offers smart fulfillment and logistics, seamless in-store and omni-channel experiences, scalable digital transformation with cloud-native POS systems, and tools to empower store associates. In the Travel, Hospitality, and Airline industries, Zapcom provides intelligent distribution and connectivity, CRS & PMS integrations, loyalty management, GDS integrations, digital operations, real-time reporting & analytics, travel extras and guest experiences, mobile & contactless solutions, revenue management & dynamic pricing, and multi-property & franchise support. Specifically for Airlines, they focus on NDC capabilities, offer & order digital services, ticketing & settlement, ancillary services optimization, GDS integrations, loyalty & customer engagement, real-time pricing & revenue management, disruption management, and mobile & self-service platforms, all underpinned by data and analytics for operational excellence. This diverse expertise makes Zapcom well-equipped to provide relevant context for an LLM operating under a Model Context Protocol.",
    });
  }

  ConvertMCPToolToOpenAITool(mcpTool: IMcpTool): ChatCompletionTool {
    return {
      type: "function",
      function: {
        name: mcpTool.name,
        description: mcpTool.description,
        parameters: mcpTool.inputSchema as FunctionParameters,
      },
    };
  }
}
