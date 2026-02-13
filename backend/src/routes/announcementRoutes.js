import express from "express";
import announcementController from "../controllers/announcementController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = express.Router();

// Admin routes - require admin role
router.post(
  "/",
  authenticate,
  authorize("admin"),
  announcementController.createAnnouncement
);

router.get(
  "/all",
  authenticate,
  authorize("admin"),
  announcementController.getAllAnnouncements
);

router.get(
  "/templates",
  authenticate,
  authorize("admin"),
  announcementController.getTemplates
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  announcementController.getAnnouncementById
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  announcementController.updateAnnouncement
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  announcementController.deleteAnnouncement
);

router.get(
  "/:id/stats",
  authenticate,
  authorize("admin"),
  announcementController.getAnnouncementStats
);

router.post(
  "/:id/broadcast",
  authenticate,
  authorize("admin"),
  announcementController.broadcastAnnouncement
);

// User routes - accessible to all authenticated users
router.get(
  "/active/me",
  authenticate,
  announcementController.getMyActiveAnnouncements
);

router.get(
  "/unread/me",
  authenticate,
  announcementController.getMyUnreadAnnouncements
);

router.post("/:id/view", authenticate, announcementController.markAsViewed);

router.post(
  "/:id/acknowledge",
  authenticate,
  announcementController.markAsAcknowledged
);

export default router;
