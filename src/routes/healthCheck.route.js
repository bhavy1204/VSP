import { healthcheck } from "../controllers/healthCHeck.controller";
import { Router } from "express";

const router = Router();

router.route("/",healthcheck);

export default router;