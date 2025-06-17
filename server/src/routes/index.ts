import { Leads } from "../db/models/leads.model";
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Hello" });
});

router.get("/leads", async (req: any, res: any) => {
  const vertical = req.query.vertical as string;
  const limit = parseInt(req.query.limit as string, 10) || 100;

  let leads;

  if (vertical != "All") {
    leads = await Leads.findAll({
      where: {
        industry: vertical,
      },
      limit,
    });
  } else {
    leads = await Leads.findAll({
      limit,
    });
  }

  return res.json({
    data: leads,
  });
});

export default router;
