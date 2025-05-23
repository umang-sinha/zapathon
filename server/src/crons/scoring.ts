import { callOpenRouter } from "../ai/openrouter";
import cron from "node-cron";
import * as fs from "fs/promises";
import path from "path";
import { insertLeadsIfNotExists, unprocessedLeads } from "../db/dao/leadsDao";
import { Leads } from "../db/models/leads.model";
import { where } from "sequelize";

export async function scoreAndSave() {
  cron.schedule("*/1 * * * *", async () => {
    const leads = await fs.readFile(
      path.resolve(process.cwd() + "/src/crons/dummydata.json"),
      "utf-8"
    );

    const leadsArray = JSON.parse(leads);

    await insertLeadsIfNotExists(leadsArray);

    const prompt = await fs.readFile(
      path.resolve(process.cwd() + "/src/ai/prompts/scoring.txt"),
      "utf-8"
    );

    const unprocessed = await unprocessedLeads();

    if (unprocessed.length > 0) {
      for (let i = 0; i < unprocessed.length; i++) {
        console.log(prompt + JSON.stringify(unprocessed[i]));
        debugger;
        // const score = await callOpenRouter(prompt + JSON.stringify(prompt));

        debugger;

        const leadToUpdate = await Leads.findByPk(
          unprocessed[i].getDataValue("id")
        );

        // const res = score[0];

        debugger;

        if (leadToUpdate) {
          (leadToUpdate as any).lead_score = Math.random().toFixed(2);
          (leadToUpdate as any).industry_score = Math.random().toFixed(2);
          (leadToUpdate as any).content_tech_score = Math.random().toFixed(2);
          (leadToUpdate as any).announcement_type_score =
            Math.random().toFixed(2);
          (leadToUpdate as any).hashtag_score = Math.random().toFixed(2);
          (leadToUpdate as any).rationale = Math.random().toFixed(2);
          await leadToUpdate.save();

          console.log(`Updated ${leadToUpdate.getDataValue("id")}`);
        }
      }
    }
  });
}
