import { Router } from "express"; // 👈 ESTA LÍNEA ES CLAVE
import portfolioRoutes from "./routes/portfolio.routes";
import docsRoutes from "./routes/docs.routes";

const router = Router();

router.use("/portfolio", portfolioRoutes);
router.use("/docs", docsRoutes);

export default router;
