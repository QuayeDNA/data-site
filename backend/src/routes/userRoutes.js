// src/routes/userRoutes.js
import express from "express";
import userController from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { userValidation } from "../validators/userValidator.js";

const router = express.Router();

// Profile management (all authenticated users)
router.get("/profile", authenticate, userController.getProfile);
router.put(
  "/profile",
  authenticate,
  validate(userValidation.updateProfile),
  userController.updateProfile
);
router.post(
  "/change-password",
  authenticate,
  validate(userValidation.changePassword),
  userController.changePassword
);

// AFA Registration (all authenticated users)
router.post(
  "/afa-registration",
  authenticate,
  validate(userValidation.afaRegistration),
  userController.afaRegistration
);
router.get(
  "/afa-registration",
  authenticate,
  userController.getAfaRegistration
);
router.get(
  "/afa-bundles",
  authenticate,
  userController.getAfaBundles
);

// User management (All agent types can view their subordinates, admin can view all)
router.get(
  "/",
  authenticate,
  authorize("agent", "super_agent", "dealer", "super_dealer", "admin"),
  userController.getUsers
);
router.get(
  "/with-wallet",
  authenticate,
  authorize("admin"),
  userController.getUsersWithWallet
);
router.get(
  "/stats",
  authenticate,
  authorize("agent", "super_agent", "dealer", "super_dealer", "admin"),
  userController.getUserStats
);
router.get(
  "/dashboard-stats",
  authenticate,
  authorize("admin"),
  userController.getDashboardStats
);
router.get(
  "/chart-data",
  authenticate,
  authorize("admin"),
  userController.getChartData
);
router.get("/:id", authenticate, userController.getUserById);

// Admin only routes
router.put(
  "/:id/status",
  authenticate,
  authorize("admin"),
  validate(userValidation.updateUserStatus),
  userController.updateUserStatus
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  userController.deleteUser
);

export default router;
