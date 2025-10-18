import express, { Application, Request, Response } from "express";
import cors from "cors";
import api from "./api";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Ruta principal (health check)
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "🚀 API Buda funcionando correctamente",
  });
});

// Rutas de la API
app.use("/api", api);

// Exportar para Vercel
export default app;

// Servidor local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
  );
}
