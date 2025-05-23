import axios from "axios";
import * as fs from "fs/promises";
import * as dotenv from "dotenv";
import JSON5 from "json5";
import path from "path";

dotenv.config();

const { OPENROUTER_API_KEY } = process.env;

debugger;

export async function callOpenRouter() {
  try {
    const prompt = await fs.readFile(path.resolve(process.cwd() + "/src/ai/prompts/dummy_data.txt"), "utf-8");

    debugger;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat:free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "my-app",
        },
      }
    );

    debugger;

    const content = response.data.choices?.[0]?.message?.content;

    debugger;

    const jsonOutput = parseLooseJson(content);

    debugger;

    return jsonOutput;
  } catch (error: any) {
    console.error(
      "Error calling OpenRouter:",
      error.response?.data || error.message
    );
  }
}

function extractJsonFromLLMOutput(text: string) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)\s*```/i);
  debugger;
  if (fencedMatch) {
    try {
      debugger;
      return JSON.parse(fencedMatch[1]);
    } catch (e) {
      console.error("Failed to parse fenced JSON:", (e as Error).message);
      return null;
    }
  }

  try {
    debugger;
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse raw JSON:", (e as Error).message);
    return null;
  }
}

function parseLooseJson(response: string): any | null {
  const codeBlockRegex = /```json\s*([\s\S]*?)\s*```/i;
  let jsonString: string | null = null;

  const match = response.match(codeBlockRegex);
  if (match && match[1]) {
    jsonString = match[1];
  } else {
    const firstBrace = response.indexOf("{");
    const lastBrace = response.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonString = response.substring(firstBrace, lastBrace + 1);
    }
  }

  if (!jsonString) {
    console.error("No JSON found in response");
    return null;
  }

  try {
    return JSON5.parse(jsonString);
  } catch (err) {
    console.error("Failed to parse loose JSON:", err);
    return null;
  }
}
