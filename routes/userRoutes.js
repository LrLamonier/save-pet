const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

// buscar um usuário específico
router.get("/", userController.getUserByID);

// criar conta
router.post("/signup", authController.signup);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authController.logout);

// recuperar senha
router.post("/esqueci-senha", authController.resetPasswordRequest);
router.patch("/esqueci-senha", authController.resetPassword);

// deletar conta
router.delete("/deletar-conta", authController.deleteAccount);

////////////////////
// zona restrita
router.use(authController.protect);

// ver perfil
router.get("/profile", userController.myProfile);

// editar perfil
router.patch("/profile", userController.editProfile);

// solicitar token para deletar conta
router.post("/deletar-conta", authController.deleteAccountRequest);

// SOMENTE ADMINS: ver todos os usuários
router.get(
  "/lista-contas",
  authController.restrictAdmin,
  userController.allUsers
);

module.exports = router;
