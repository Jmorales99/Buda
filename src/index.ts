import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import api from "./api";

const app: Application = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  const webPath = path.join(__dirname, "web");
  app.use(express.static(webPath));

  app.get("/", (_req: Request, res: Response) => {
    res.sendFile(path.join(webPath, "index.html"));
  });
} else {
  // En producción (Vercel), solo muestra el healthcheck
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "🚀 API Buda funcionando correctamente",
    });
  });
}

app.use("/api", api);

export default app;

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
  );
}
