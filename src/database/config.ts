import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Asistencia } from "../models/Asistencia";
import { Clases } from "../models/Clases";
import { Estudiante } from "../models/Estudiante";
import { Profesor } from "../models/Profesor";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

const pool: DataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Estudiante, Profesor, Clases, Asistencia],
  synchronize: true,
  logging: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default pool;
