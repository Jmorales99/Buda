import { Router } from "express";
import portfolioRoutes from "./routes/portfolio.routes.js";
import docsRoutes from "./routes/docs.routes.js";
import marketsRoutes from "./routes/markets.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 API Buda funcionando correctamente",
  });
});

router.use("/portfolio", portfolioRoutes);
router.use("/docs", docsRoutes);
router.use("/markets", marketsRoutes);

export default router;
