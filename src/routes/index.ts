import { Router, Request, Response } from "express";
const router = Router();

// controller import
import { signUpController, signInController } from "../api/v1/auth";

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    health: "Ok",
  });
});

// aut route SignIn and SignUp
router.route("/v1/auth/signup").post(signUpController);
router.route("/v1/auth/signin").post(signInController);

export default router;
