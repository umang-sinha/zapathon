import {
  DIVIDE_TOOL_NAME,
  DIVIDE_TOOL_SCHEMA,
  divideTool,
} from "./calculateSum.js";

export const TOOLS = {
  DIVIDE_TOOL: {
    NAME: DIVIDE_TOOL_NAME,
    SCHEMA: DIVIDE_TOOL_SCHEMA,
    ACTION: divideTool,
  },
};
