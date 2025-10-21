import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger";

const router = Router();

const doc =
  (swaggerDocument as any).default ?? swaggerDocument;

router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(doc, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
  })
);

export default router;
