import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv, { config } from "dotenv";
import personRouter from "./routes/personRouter.js";
import errorHandler from "./utils/errorHandler.js";
import unknownEndpoint from "./middlewares/unknownEndpoint.js";
import connectToDB from "./utils/connectToDB.js";
import config from "./utils/config.js";

// to see the env, it needs to be installed in the terminal ising npm install dotenv and import it and use .config

const app = express();

connectToDB(config.MONGODB_URI);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]:body")
);
app.use("/api/persons", personRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
