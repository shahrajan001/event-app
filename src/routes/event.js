const express = require("express");
const router = new express.Router();
const Event = require("../models/event");
const auth = require("../middleware/auth");

const eventController = require("../controllers/eventController");

router.post("/addEvent",auth, eventController.addEvent);
router.get("/listEvents",auth,eventController.listEvents);
router.patch("/updateEvent",auth, eventController.updateEvent);
router.delete("/deleteEvent",auth,eventController.deleteEvent);

module.exports = router;