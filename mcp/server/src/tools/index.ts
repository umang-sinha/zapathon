import {
  DIVIDE_TOOL_NAME,
  DIVIDE_TOOL_SCHEMA,
  divideTool,
} from "./calculateSum.js";
import { getProspects, SALES_TOOL_NAME, SALES_TOOL_SCHEMA } from "./salesData.js";

export const TOOLS = {
  DIVIDE_TOOL: {
    NAME: DIVIDE_TOOL_NAME,
    SCHEMA: DIVIDE_TOOL_SCHEMA,
    ACTION: divideTool,
  },
  SALES_TOOL: {
    NAME: SALES_TOOL_NAME,
    SCHEMA: SALES_TOOL_SCHEMA,
    ACTION: getProspects
  }
};
