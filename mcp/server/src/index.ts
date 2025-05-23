import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { TOOLS } from "./tools/index.js";

const server = new Server(
  {
    name: "sales-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [TOOLS.DIVIDE_TOOL.SCHEMA],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_sales_info") {
    return {};
  }
  if (request.params.name === TOOLS.DIVIDE_TOOL.NAME) {
    const args = request.params.arguments as
      | Record<string, unknown>
      | undefined;
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
  await server.connect(transport);
})();
