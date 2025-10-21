import { Router } from "express";
import portfolioRoutes from "./routes/portfolio.routes.js";
import docsRoutes from "./routes/docs.routes.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 API Buda funcionando correctamente",
  });
});

router.use("/portfolio", portfolioRoutes);
router.use("/docs", docsRoutes);

export default router;
