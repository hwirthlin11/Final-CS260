const Appointment = require("../models/AppointmentModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Appointment Schema
function AppointmentData(data) {
  this.id = data._id;
  this.date = data.date;
  this.serviceId = data.serviceId;
  this.serviceName = data.serviceName;
  this.user = data.user;
}

/**
 * Appointment List.
 *
 * @returns {Object}
 */
exports.appointmentList = [
  auth,
  function (req, res) {
    try {
      Appointment.find(
        { user: req.user._id },
        "_id date time serviceId serviceName"
      ).then((appointments) => {
        if (appointments.length > 0) {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            appointments
          );
        } else {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            []
          );
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Appointment Detail.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.appointmentDetail = [
  auth,
  function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.successResponseWithData(res, "Operation success", {});
    }
    try {
      Appointment.findOne(
        { _id: req.params.id, user: req.user._id },
        "_id date time serviceId serviceName"
      ).then((appointment) => {
        if (appointment !== null) {
          let appointmentData = new AppointmentData(appointment);
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            appointmentData
          );
        } else {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            {}
          );
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Appointment store.
 *
 * @param {string}      title
 * @param {string}      description
 * @param {string}      isbn
 *
 * @returns {Object}
 */
exports.appointmentStore = [
  auth,
  body("date", "date must not be empty.").isLength({ min: 1 }).trim(),
  body("time", "time must not be empty.").isLength({ min: 1 }).trim(),
  sanitizeBody("*").escape(),
  (req, res) => {
    try {
      console.log(req.user, "user from jwt");
      const errors = validationResult(req);
      var appointment = new Appointment({
        date: req.body.date,
        user: req.user,
        time: req.body.time,
        serviceId: req.body.serviceId,
        serviceName: req.body.serviceName,
      });

      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        //Save appointment.
        appointment.save(function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          let appointmentData = new AppointmentData(appointment);
          return apiResponse.successResponseWithData(
            res,
            "Appointment add Success.",
            appointmentData
          );
        });
      }
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Appointment update.
 *
 * @param {string}      title
 * @param {string}      description
 * @param {string}      isbn
 *
 * @returns {Object}
 */
exports.appointmentUpdate = [
  auth,
  body("date", "date must not be empty.").isLength({ min: 1 }).trim(),
  body("time", "time must not be empty.").isLength({ min: 1 }).trim(),
  sanitizeBody("*").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      var appointment = new Appointment({
        date: req.body.date,
        time: req.body.time,
        _id: req.params.id,
      });

      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return apiResponse.validationErrorWithData(
            res,
            "Invalid Error.",
            "Invalid ID"
          );
        } else {
          Appointment.findById(req.params.id, function (err, foundAppointment) {
            if (foundAppointment === null) {
              return apiResponse.notFoundResponse(
                res,
                "Appointment not exists with this id"
              );
            } else {
              //Check authorized user
              if (foundAppointment.user.toString() !== req.user._id) {
                return apiResponse.unauthorizedResponse(
                  res,
                  "You are not authorized to do this operation."
                );
              } else {
                //update appointment.
                Appointment.findByIdAndUpdate(
                  req.params.id,
                  appointment,
                  {},
                  function (err) {
                    if (err) {
                      return apiResponse.ErrorResponse(res, err);
                    } else {
                      let appointmentData = new AppointmentData(appointment);
                      return apiResponse.successResponseWithData(
                        res,
                        "Appointment update Success.",
                        appointmentData
                      );
                    }
                  }
                );
              }
            }
          });
        }
      }
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

/**
 * Appointment Delete.
 *
 * @param {string}      id
 *
 * @returns {Object}
 */
exports.appointmentDelete = [
  auth,
  function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid ID"
      );
    }
    try {
      Appointment.findById(req.params.id, function (err, foundAppointment) {
        if (foundAppointment === null) {
          return apiResponse.notFoundResponse(
            res,
            "Appointment not exists with this id"
          );
        } else {
          //Check authorized user
          if (foundAppointment.user.toString() !== req.user._id) {
            return apiResponse.unauthorizedResponse(
              res,
              "You are not authorized to do this operation."
            );
          } else {
            //delete appointment.
            Appointment.findByIdAndRemove(req.params.id, function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              } else {
                return apiResponse.successResponse(
                  res,
                  "Appointment delete Success."
                );
              }
            });
          }
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
