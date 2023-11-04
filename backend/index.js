import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import personRouter from "./routes/personRouter.js";

dotenv.config();

const app = express();
const PORT = 3001;
const url = process.env.MONGODB_URI;
// to see the env, it needs to be installed in the terminal ising npm install dotenv and import it and use .config

mongoose.set("strictQuery", false);
mongoose.connect(url);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

function unknownEndpoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

app.use(express.json());
app.use(cors());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]:body")
);
// to indicate a unused function put an "_"
app.use(express.static("dist"));
app.use("/api/persons", personRouter);
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
