import { Sequelize } from "sequelize";
import userModel from "./User.js";
import lawyerModel from "./Lawyer.js";
import caseModel from "./Case.js";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
  }
);

const User = userModel(sequelize);
const Lawyer = lawyerModel(sequelize);
const Case = caseModel(sequelize);

Lawyer.belongsToMany(Case, { through: "LawyerCases", as: "Cases" });
Case.belongsToMany(Lawyer, { through: "LawyerCases", as: "Lawyers" });

export { sequelize, User, Lawyer, Case };
