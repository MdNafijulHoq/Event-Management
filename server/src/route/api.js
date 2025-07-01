const express = require("express");
const router = express.Router();
const controller = require("../controllers/UserController.js");
const AuthVerificationMiddleware = require("../middleware/AuthVerificationMiddleware.js");
const category = require("../controllers/CategoryController.js");
const eventController = require("../controllers/EventController.js");

// User related routes
router.post("/UserSignUp", controller.UserSignUp);
router.post("/UserSignIn", controller.UserSignIn);
router.get(
  "/CheckingLoggedInUser",
  AuthVerificationMiddleware,
  controller.CheckingLoggedInUser
);
router.get("/UserLogOut", AuthVerificationMiddleware, controller.UserLogOut);
router.get("/profileRead", AuthVerificationMiddleware, controller.userprofile);

// Category Route
router.post("/CreateCategory", category.CreateCategory);
router.get("/ViewCategory", category.ViewCategory);
router.get("/ListByCategory/:categoryId", category.ListByCategory);

// Event Route
router.post(
  "/CreateEvent",
  AuthVerificationMiddleware,
  eventController.CreateEvent
);
router.get(
  "/EventByUser",
  AuthVerificationMiddleware,
  eventController.EventByUser
);
router.get("/GetEvent", eventController.GetEvent);
router.get(
  "/GetEventDetailsByID/:EventId",
  eventController.GetEventDetailsByID
);
router.put("/UpdateEvent/:EventId", AuthVerificationMiddleware, eventController.UpdateEvent);
router.delete(
  "/EventDelete/:EventId",
  AuthVerificationMiddleware,
  eventController.EventDelete
);
router.post("/JoinEvent/:eventId", AuthVerificationMiddleware, eventController.JoinEvent);
router.get('/search', eventController.SearchEvents);
router.get('/filter', eventController.FilterEvents);

module.exports = router;
