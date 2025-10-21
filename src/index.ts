import express from "express";
import path from "path";

const app = express();

app.use(express.json());

const webPath = path.join(__dirname, "web");
app.use(express.static(webPath));

app.get("/", (_req, res) => {
  res.sendFile(path.join(webPath, "index.html"));
});

import api from "./api";
app.use("/api", api);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

export default app;
