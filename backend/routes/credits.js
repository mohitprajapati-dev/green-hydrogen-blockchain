import express from "express";
import {
  issueCredit,
  transferCredit,
  verifyCredit,
} from "../controllers/creditsController.js";

const router = express.Router();

router.post("/issue", issueCredit);
router.post("/transfer", transferCredit);
router.post("/verify", verifyCredit);

export default router;