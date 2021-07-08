var express = require("express");
const AppointmentController = require("../controllers/AppointmentController");

var router = express.Router();

router.get("/", AppointmentController.appointmentList);
router.get("/:id", AppointmentController.appointmentDetail);
router.post("/", AppointmentController.appointmentStore);
router.put("/:id", AppointmentController.appointmentUpdate);
router.delete("/:id", AppointmentController.appointmentDelete);

module.exports = router;
