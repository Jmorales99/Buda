import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger";

const router = Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
