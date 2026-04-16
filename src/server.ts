import "reflect-metadata";
import app from "./app";
import pool from "./database/config";
import { SwaggerDoc } from "./swagger/swagger";

(() => {
  SwaggerDoc(app);

  // Start server immediately
  app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });

  // Initialize database connection in background
  pool
    .initialize()
    .then(() => console.log("Initialized pool ok!"))
    .catch((err) => console.error("Error initialization pool!", err.message));
})();
