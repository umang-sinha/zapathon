import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { SUPABASE_DB_URL } = process.env;

export const sequelize = new Sequelize(SUPABASE_DB_URL as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});
