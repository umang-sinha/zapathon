import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Leads = sequelize.define("Leads", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  hashtags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
  lead_score: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  industry_score: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  content_tech_score: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  announcement_type_score: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  hashtag_score: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  contact_name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rationale: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
});
