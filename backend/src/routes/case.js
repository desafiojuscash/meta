import express from "express";
import CaseController from "../controllers/CaseController.js";
import validate from "../middlewares/validate.js";
import validateToken from "../middlewares/validateToken.js";
import caseSchema from "../schemas/createCase.js";
import updateCaseStatus from "../schemas/updateCaseStatus.js";

const router = express.Router();
const controller = new CaseController();

router.post(
  "/",
  validateToken,
  validate(caseSchema),
  (req, res) => controller.create(req, res)
);

router.get("/", validateToken, (req, res) => controller.list(req, res));
router.get("/:id", validateToken, (req, res) => controller.getById(req, res));

router.patch("/:id", validateToken, validate(updateCaseStatus), (req, res) => controller.updateStatus(req, res));

export default router;
