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
  createBulkQuizController,
  searchQuizController,
} from "../api/v1/quiz";
import {
  createResultController,
  getSingleResultController,
} from "../api/v1/result";
import { getCheckParticipateController } from "../api/v1/participates";
import { getParticipantsQuizController } from "../api/v1/user";

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    health: "Ok",
    msg: "Hello world! This is new text!",
  });
});

// aut route SignIn and SignUp
router.route("/v1/auth/signup").post(signUpController);
router.route("/v1/auth/signin").post(signInController);

// quiz CRUD routes
router.route("/v1/quizzes").get(getQuizController);
router.route("/v1/quizzes").post(auth, createQuizController);
router.route("/v1/quizzes/bulk").post(auth, createBulkQuizController);
router
.route("/v1/quizzes/:id")
.get(getSingleQuizController)
.patch(auth, ownership("Quiz"), updateQuizController)
.delete(auth, ownership("Quiz"), deleteQuizController);

// search quiz route
router.route("/v1/search/quizzes").get(searchQuizController);

// result routes
router.route("/v1/:id/result").get(auth, getSingleResultController);
router.route("/v1/result").post(auth, createResultController);

// routes for participates
router
  .route("/v1/:id/checkParticipates")
  .get(auth, getCheckParticipateController);

// routes for users
router.route("/v1/users/participants/:userId").get(getParticipantsQuizController);

export default router;
