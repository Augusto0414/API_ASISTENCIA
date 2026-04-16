"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Asistencia_1 = require("../models/Asistencia");
const Clases_1 = require("../models/Clases");
const Estudiante_1 = require("../models/Estudiante");
const Profesor_1 = require("../models/Profesor");
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}
const pool = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Estudiante_1.Estudiante, Profesor_1.Profesor, Clases_1.Clases, Asistencia_1.Asistencia],
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false,
    },
});
exports.default = pool;
