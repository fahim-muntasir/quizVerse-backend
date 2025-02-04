import { Router, Request, Response } from "express";
const router = Router();

// middleware import
import { auth } from "../middleware/auth";
import { ownership } from "../middleware/ownership";

// controller import
import { signUpController, signInController } from "../api/v1/auth";
import {
  createQuizController,
  updateQuizController,
  deleteQuizController,
  getQuizController,
  getSingleQuizController,
} from "../api/v1/quiz";
import { createResultController, getSingleResultController } from "../api/v1/result";

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    health: "Ok",
  });
});

// aut route SignIn and SignUp
router.route("/v1/auth/signup").post(signUpController);
router.route("/v1/auth/signin").post(signInController);

// quiz CRUD routes
router.route("/v1/quizzes").get(getQuizController);
router.route("/v1/quizzes").post(auth, createQuizController);
router
  .route("/v1/quizzes/:id")
  .get(getSingleQuizController)
  .patch(auth, ownership("Quiz"), updateQuizController)
  .delete(auth, ownership("Quiz"), deleteQuizController);

// result routes
router.route("/v1/:id/result").get(auth, getSingleResultController);
router.route("/v1/result").post(auth, createResultController);

export default router;
