import { sequelize } from "./db/db";
import app from "./app";
import { Leads } from "./db/models/leads.model";
import { fetchDummyDataAndSave } from "./crons/fetchDummyData";
import { scoreAndSave } from "./crons/scoring";

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await Leads.sync();

    await sequelize.authenticate();
    console.log("Models loaded:", sequelize.models);

    console.log("DB connected");

    // await fetchDummyDataAndSave();
    await scoreAndSave();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

start();
