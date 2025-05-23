import axios from "axios";
export const SALES_TOOL_NAME = "get_prospects";
export const SALES_TOOL_SCHEMA = {
    name: SALES_TOOL_NAME, // A more descriptive name for the tool
    description: "Retrieves the top 'n' prospects to reach out to, optionally filtered by a specific vertical. Use this tool when the user asks for top prospects, prospects to reach out to, or similar queries that imply needing a list of leads.",
    inputSchema: {
        type: "object",
        properties: {
            vertical: {
                type: "string",
                description: "The industry or sector to filter prospects by (e.g., 'healthcare', 'finance', 'retail'). Defaults to 'All' if not specified, meaning prospects from all verticals will be considered.",
                default: "All",
            },
            numberOfRecords: {
                // Renamed from 'number' for clarity and to avoid conflict with 'number' type
                type: "number",
                description: "The maximum number of top prospects to retrieve. Defaults to 10 if not specified.",
                default: 10,
            },
        },
        // No 'required' field here, as both arguments are optional and have defaults.
    },
};
export const getProspects = async (vertical = SALES_TOOL_SCHEMA.inputSchema.properties.vertical.default, numberOfRecords = SALES_TOOL_SCHEMA.inputSchema.properties.numberOfRecords
    .default) => {
    try {
        const url = `http://localhost:3000/api/leads`;
        const params = {
            vertical,
            limit: numberOfRecords,
        };
        if (vertical !== "All") {
            params.vertical = vertical;
        }
        if (numberOfRecords !==
            SALES_TOOL_SCHEMA.inputSchema.properties.numberOfRecords.default) {
            params.limit = numberOfRecords; // Assuming your API uses 'limit' for number of records
        }
        const result = await axios.get(url, { params });
        return result.data; // Assuming the API returns the leads directly in result.data
    }
    catch (error) {
        console.error("Error fetching top prospects:", error);
        throw new Error("Failed to retrieve top prospects.");
    }
};
