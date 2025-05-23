import { callOpenRouter } from "../ai/openrouter";
import cron from "node-cron";
import * as fs from "fs/promises";
import path from "path";

export async function fetchDummyDataAndSave() {
  cron.schedule("*/60 * * * *", async () => {
    const prompt = await fs.readFile(
      path.resolve(process.cwd() + "/src/ai/prompts/dummy_data.txt"),
      "utf-8"
    );

    const newItems = await callOpenRouter(prompt);

    if (!newItems) {
      return;
    }

    try {
      let existingArray: any[] = [];

      try {
        const fileContent = await fs.readFile("dummydata.json", "utf-8");
        existingArray = JSON.parse(fileContent);
        if (!Array.isArray(existingArray)) {
          throw new Error("JSON content is not an array");
        }
      } catch (error) {
        console.warn(
          "Could not read or parse JSON file, initializing empty array."
        );
      }

      existingArray.push(...newItems);

      await fs.writeFile(
        "dummydata.json",
        JSON.stringify(existingArray, null, 2),
        "utf-8"
      );
      console.log("Items appended successfully.");
    } catch (err) {
      console.error("Error updating JSON file:", err);
    }
  });
}
