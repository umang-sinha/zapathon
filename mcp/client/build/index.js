import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
const transport = new StdioClientTransport({
    command: "zsh",
    args: ["-c", "cd '../server/build' && node index.js"],
});
const client = new Client({
    name: "mcp-client",
    version: "1.0.0",
});
const runClient = async () => {
    await client.connect(transport);
    const tools = await client.listTools();
    console.log(tools);
};
runClient();
