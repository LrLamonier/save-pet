const express = require("express");
const authController = require("../controllers/authController");
const eventController = require("../controllers/eventController");

const router = express.Router();

router.get("/", eventController.allEvents);

router.get("/usuario/:id_usuario", eventController.allEventsByUser);

router.use(authController.protect);

router
  .route("/meus-chamados")
  .get(eventController.myEvents)
  .post(eventController.createEvent)
  .patch(eventController.checkAuthEvent, eventController.editEvent)
  .delete(eventController.checkAuthEvent, eventController.deleteEvent);

module.exports = router;
