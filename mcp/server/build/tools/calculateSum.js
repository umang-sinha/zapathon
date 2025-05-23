export const DIVIDE_TOOL_NAME = "calculate_division";
export const DIVIDE_TOOL_SCHEMA = {
    name: DIVIDE_TOOL_NAME,
    description: "Divide one number by another. The number that is first is the numerator",
    inputSchema: {
        type: "object",
        properties: {
            a: { type: 'number' },
            b: { type: 'number' }
        },
        required: ["a", "b"]
    }
};
export const divideTool = (a, b) => {
    return {
        toolResult: a / b
    };
};
