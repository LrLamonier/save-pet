const express = require("express");
const authController = require("../controllers/authController");
const eventController = require("../controllers/eventController");

const router = express.Router();

// buscar todos os chamados
router.get("/", eventController.allEvents);

// buscar todos os chamados de um usuário
router.get("/chamados/:id_usuario", eventController.allEventsByUser);

// zona restrita
router.use(authController.protect);

// criar chamado
router.post("/chamado", eventController.createEvent);

// editar chamado
router.patch(
  "/chamado",
  eventController.checkAuthEvent,
  eventController.editEvent
);

// deletar chamado
router.delete(
  "/chamado",
  eventController.checkAuthEvent,
  eventController.deleteEvent
);

module.exports = router;
