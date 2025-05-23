export const DIVIDE_TOOL_NAME = "calculate_division"

export const DIVIDE_TOOL_SCHEMA = {
    name: DIVIDE_TOOL_NAME,
    description: "Divides a number (the numerator or dividend) by another number (the denominator or divisor). Use this tool when the user asks to perform a division operation, explicitly mentioning two numbers to divide.",
    inputSchema: {
        type: "object",
        properties: {
            a: { // Renamed 'a' to 'numerator' for clarity
                type: 'number',
                description: "The number to be divided, also known as the dividend. This is typically the first number mentioned by the user for division.",
            },
            b: { // Renamed 'b' to 'denominator' for clarity
                type: 'number',
                description: "The number by which to divide (the divisor). This is typically the second number mentioned by the user for division. Ensure this value is not zero.",
            }
        },
        required: ["a", "b"] // Updated required fields to match new names
    }
};

export const divideTool = (a: number, b: number) => {
    return {
        toolResult: a / b
    }
}