import { Leads } from "../models/leads.model";
import * as fs from "fs/promises";

export async function insertLeadsIfNotExists(leadsArray: any[]) {
  for (let index = 0; index < leadsArray.length; index++) {
    const id = index + 1;

    const existing = await Leads.findByPk(id);
    if (!existing) {
      await Leads.create({ id, ...leadsArray[index] });
      console.log(`Inserted lead with ID ${id}`);
    } else {
      //   console.log(`Lead with ID ${id} already exists, skipping...`);
    }
  }
}

export async function unprocessedLeads() {
  const leads = await Leads.findAll({
    where: {
      lead_score: null,
    },
    order: [["id", "ASC"]],
    limit: 10,
  });

  return leads;
}
