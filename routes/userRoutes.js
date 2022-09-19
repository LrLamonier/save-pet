const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

//buscar usuários
// router.get("/", userController.allUsers);

// criar conta
router.post("/signup", authController.signup);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authController.logout);

// deletar conta
// router.get("/", userController.allUsers);

// ver perfil
// router.get("/profile", userController.perfil);

// editar perfil
router.patch("/profile", authController.protect, userController.editProfile);

module.exports = router;
