"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./database/config"));
const swagger_1 = require("./swagger/swagger");
(() => {
    (0, swagger_1.SwaggerDoc)(app_1.default);
    // Start server immediately
    app_1.default.listen(app_1.default.get("port"), () => {
        console.log(`Server is running on port ${app_1.default.get("port")}`);
    });
    // Initialize database connection in background
    config_1.default
        .initialize()
        .then(() => console.log("Initialized pool ok!"))
        .catch((err) => console.error("Error initialization pool!", err.message));
})();
