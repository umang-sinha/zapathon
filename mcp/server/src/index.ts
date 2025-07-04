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
  console.error("LIST TOOLS");
  return {
    tools: [
      TOOLS.DIVIDE_TOOL.SCHEMA,
      TOOLS.SALES_TOOL.SCHEMA,
      TOOLS.COMPANY_TOOL.SCHEMA,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === TOOLS.SALES_TOOL.NAME) {
    const args = request.params.arguments as
      | Record<string, unknown>
      | undefined;

    const vertical =
      typeof args?.vertical === "string"
        ? args.vertical
        : TOOLS.SALES_TOOL.SCHEMA.inputSchema.properties.vertical.default;

    const numberOfRecords =
      typeof args?.numberOfRecords === "number"
        ? args.numberOfRecords
        : TOOLS.SALES_TOOL.SCHEMA.inputSchema.properties.numberOfRecords
            .default;

    const res = await TOOLS.SALES_TOOL.ACTION(vertical, numberOfRecords);

    console.log("API response:", res);
    return {
      toolResult: res,
    };
  }
  if (request.params.name == TOOLS.DIVIDE_TOOL.NAME) {
    console.error("REached here");
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

  if (request.params.name === TOOLS.COMPANY_TOOL.NAME) {
    const args = request.params.arguments as
      | Record<string, unknown>
      | undefined;

    const vertical =
      typeof args?.vertical === "string"
        ? args.vertical
        : TOOLS.COMPANY_TOOL.SCHEMA.inputSchema.properties.vertical.default;

    const company = typeof args?.company === "string" ? args.company : "";

    if (company == "") {
      throw new McpError(ErrorCode.InvalidParams, "Company Not given");
    }

    const res = await TOOLS.COMPANY_TOOL.ACTION(company, vertical);

    console.log("API response:", res);
    return {
      toolResult: res,
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, "Tool Not Found");
});

const transport = new StdioServerTransport();
(async () => {
  console.error(
    "MCP Server: Successfully connected to transport. Awaiting requests."
  ); // <--- ADD THIS
  await server.connect(transport);
})();
