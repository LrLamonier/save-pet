const express = require("express");
const router = express.Router();
const adoptController = require("../controllers/adoptController");

// cadastrar adoção
router.post("/", adoptController.newAdopt);

// alterar cadastro adoção
router.patch("/", adoptController.updateAdopt);

module.exports = router;
