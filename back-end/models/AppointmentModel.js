var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AppointmentSchema = new Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
