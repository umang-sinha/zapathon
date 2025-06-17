import { getSupabaseClient } from "../src/db/supabase";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export async function migrateToSupabase() {
  const supabaseClient = getSupabaseClient();

  const dummyDataPath = path.resolve(
    `${process.cwd()}/src/crons/linkedin_announcements_500.json`
  );

  const leads = JSON.parse(fs.readFileSync(dummyDataPath, "utf-8"));

  console.log(dummyDataPath);

  for (let i = 0; i < leads.length; i++) {

    if (i <= 243) {
      continue;
    }

    const res = await supabaseClient.from("Leads").insert({
      company: leads[i]["company"],
      industry: leads[i]["industry"],
      content: leads[i]["content"],
      hashtags: leads[i]["hashtags"],
      lead_score: leads[i]["lead_score"],
      industry_score: leads[i]["industry_score"],
      content_tech_score: leads[i]["content_tech_score"],
      announcement_type_score: leads[i]["announcement_type_score"],
      hashtag_score: leads[i]["hashtag_score"],
      rationale: leads[i]["rationale"],
    });
    console.log(`INSERTED ${i} INTO SUPABASE, STAT: ${res.status}`);
  }
}

export async function populateScores() {
  const supabaseClient = getSupabaseClient();

  const res = await supabaseClient
    .from("Leads")
    .select("*", { count: "exact", head: true });

  const count = res.count;

  if (!count) {
    throw new Error("Count not found");
  }

  for (let i = 1; i <= count; i++) {
    console.time(`Update for ${i} took:`);

    await supabaseClient
      .from("Leads")
      .update({
        lead_score: Math.random().toFixed(2),
        industry_score: Math.random().toFixed(2),
        content_tech_score: Math.random().toFixed(2),
        announcement_type_score: Math.random().toFixed(2),
        hashtag_score: Math.random().toFixed(2),
      })
      .eq("id", i);

    console.timeEnd(`Update for ${i} took:`);
  }
}
