const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

//buscar usuários
router.get("/", userController.allUsers);

// criar conta
router.post("/signup", authController.signup);

// login
router.post("/login", authController.login);

// logout
router.get("/logout", authController.logout);

// ver perfil
// router.get("/profile", userController.perfil);

// editar perfil
router.patch("/profile", authController.protect, userController.editProfile);

// trocar senha
router.post("/esqueci-senha", authController.resetPasswordRequest);
router.patch("/esqueci-senha", authController.resetPassword);

// deletar conta
router.post(
  "/deletar-conta",
  authController.protect,
  authController.deleteAccountRequest
);
router.delete("/deletar-conta", authController.deleteAccount);

module.exports = router;
