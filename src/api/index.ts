import { Router } from "express";
import portfolioRoutes from "./routes/portfolio.routes";
import docsRoutes from "./routes/docs.routes";
import axios from "axios";

const router = Router();

router.use("/portfolio", portfolioRoutes);
router.use("/docs", docsRoutes);

router.get("/markets", async (_req, res) => {
  try {
    const response = await axios.get("https://www.buda.com/api/v2/markets");
    res.json(response.data);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los mercados desde Buda.",
      error: error.message,
    });
  }
});

export default router;
