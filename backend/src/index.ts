import express from "express";
import entriesRoute from "./routes/entries";

import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/health", (_req, res) => {
  console.log("someone pinged here");
  res.send("healthy!");
});

app.use("/api/entries", entriesRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});