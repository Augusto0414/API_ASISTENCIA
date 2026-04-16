import "reflect-metadata";
import app from "./app";
import pool from "./database/config";
import { SwaggerDoc } from "./swagger/swagger";

(() => {
  pool
    .initialize()
    .then(() => console.log("Initialized pool ok!"))
    .catch((error) => {
      console.error("Error initialization pool!");
      console.error("Details:", error.message);
      console.error("Stack:", error.stack);
    });
  SwaggerDoc(app);
  app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
})();
