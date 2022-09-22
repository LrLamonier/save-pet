const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/u/:id", userController.getUserByID);

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router
  .route("/esqueci-senha")
  .post(authController.resetPasswordRequest)
  .patch(authController.resetPassword);

router
  .route("/deletar-conta")
  .post(authController.protect, authController.deleteAccountRequest)
  .delete(authController.deleteAccount);

router.use(authController.protect);

router
  .route("/profile")
  .get(userController.myProfile)
  .patch(userController.editProfile);

router.get(
  "/lista-contas",
  authController.restrictAdmin,
  userController.allUsers
);

module.exports = router;
