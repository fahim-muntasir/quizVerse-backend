import { Router, Request, Response } from "express";
const router = Router();

// middleware import
import { auth } from "../middleware/auth";

// controller import
import { signUpController, signInController } from "../api/v1/auth";
import { createQuizController, updateQuizController } from "../api/v1/quiz";

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    health: "Ok",
  });
});

// aut route SignIn and SignUp
router.route("/v1/auth/signup").post(signUpController);
router.route("/v1/auth/signin").post(signInController);

// quiz CRUD routes
router.route("/v1/quizzes").post(auth, createQuizController);
router.route("/v1/quizzes/:id").patch(auth, updateQuizController);

export default router;
