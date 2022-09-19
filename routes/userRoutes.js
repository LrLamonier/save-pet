const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const Auth = require("../src/middlewares/Auth");
const AuthValidator = require("../validators/AuthValidator");



//route user
//buscar usuários
router.get("/", userController.allUsers);

// criar conta
router.post("/signup", AuthValidator.signup, authController.signup);

// login
// router.post("/login", authController.login);

// logout
// router.post("/logout", authController.logout);

// deletar conta
router.get("/", userController.allUsers)

// // login
router.post("/login", authController.login);

// // logout
// router.post("/logout", authController.logout);

// // deletar conta

// router.delete("/delete-account", authController.deleteAccount);

// ver perfil
router.get("/profile", userController.perfil);

// editar perfil
// router.patch("/profile", authController.protect, userController.editProfile);

//Rota de teste do banco Vando
// router.get('teste', (req, res) =>{
//     res.render()
// })

// router.post('/teste-banco', async (req, res, next) =>{
//     await UsuarioTeste.create(req, res, next)
// })

module.exports = router;
