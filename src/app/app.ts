import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
const express = require("express");
// const middleware = require("../middleware");
import routes from "../routes";
import { globalError, notFountError } from "./errors";

const app = express();

// api routes
app.use("/api", routes);

// error handler
app.use(notFountError);
app.use(globalError);

export default app;
