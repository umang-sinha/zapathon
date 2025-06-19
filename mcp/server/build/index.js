import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError, } from "@modelcontextprotocol/sdk/types.js";
import { TOOLS } from "./tools/index.js";
const server = new Server({
    name: "sales-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error("LIST TOOLS");
    return {
        tools: [TOOLS.DIVIDE_TOOL.SCHEMA, TOOLS.SALES_TOOL.SCHEMA],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === TOOLS.SALES_TOOL.NAME) {
        const args = request.params.arguments;
        // Extracting 'vertical' and 'numberOfRecords' with their default values
        const vertical = typeof args?.vertical === "string"
            ? args.vertical
            : TOOLS.SALES_TOOL.SCHEMA.inputSchema.properties.vertical.default;
        const numberOfRecords = typeof args?.numberOfRecords === "number"
            ? args.numberOfRecords
            : TOOLS.SALES_TOOL.SCHEMA.inputSchema.properties.numberOfRecords.default;
        // Call the action function, passing the extracted arguments
        // You'll need to define TOOLS.SALES_TOOL.ACTION to accept these arguments.
        const res = await TOOLS.SALES_TOOL.ACTION(vertical, numberOfRecords);
        // Now 'res' will contain the data returned from your API call
        // You would typically send this 'res' back as a response to the client.
        console.log("API response:", res);
        // Example: send the response back
        // response.status(200).json(res);
        return {
            toolResult: res
        };
    }
    if (request.params.name == TOOLS.DIVIDE_TOOL.NAME) {
        console.error("REached here");
        const args = request.params.arguments;
        const a = typeof args?.a === "number" ? args.a : 0;
        const b = typeof args?.b === "number" ? args.b : 0;
        const res = TOOLS.DIVIDE_TOOL.ACTION(a, b);
        return {
            toolResult: res,
        };
    }
    throw new McpError(ErrorCode.InvalidRequest, "Tool Not Found");
});
const transport = new StdioServerTransport();
(async () => {
    console.error("MCP Server: Successfully connected to transport. Awaiting requests."); // <--- ADD THIS
    await server.connect(transport);
})();
