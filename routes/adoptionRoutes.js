const express = require("express");
const adoptController = require("../controllers/adoptController");

const router = express.Router();

// cadastrar adoção
router.post("/", adoptController.newAdopt);

// alterar cadastro adoção
router.patch("/", adoptController.updateAdopt);

module.exports = router;
