const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const UsuarioTeste = require("../controllers/UsuarioTeste");

const router = express.Router();

// criar conta
router.post("/signup", authController.signup);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authController.logout);

// deletar conta
router.delete("/delete-account", authController.deleteAccount);

// ver perfil
router.get("/profile", authController.protect, userController.getMe);

// editar perfil
router.patch("/profile", authController.protect, userController.editProfile);

//Rota de teste do banco Vando
// router.get('teste', (req, res) =>{
//     res.render()
// })
router.post('/teste-banco', async (req, res, next) =>{
    await UsuarioTeste.create(req, res, next)
})

module.exports = router;
