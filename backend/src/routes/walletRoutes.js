// src/routes/walletRoutes.js
import express from "express";
import walletController from "../controllers/walletController.js";
import {
  authenticate,
  authorize,
  authorizeWalletUser,
} from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { walletValidation } from "../validators/walletValidator.js";

const router = express.Router();

// Routes for all authenticated users
router.get("/info", authenticate, walletController.getWalletInfo);
router.get(
  "/transactions",
  authenticate,
  validate(walletValidation.transactionHistory),
  walletController.getTransactionHistory
);

// Routes for wallet-enabled users (can request top-up)
router.get(
  "/check-pending-topup",
  authenticate,
  authorizeWalletUser,
  walletController.checkPendingTopUpRequest
);
router.post(
  "/request-top-up",
  authenticate,
  authorizeWalletUser,
  validate(walletValidation.topUpRequest),
  walletController.requestWalletTopUp
);

// Routes for admins/admins
router.post(
  "/top-up",
  authenticate,
  authorize("admin"),
  validate(walletValidation.adminTopUp),
  walletController.topUpWallet
);
router.post(
  "/debit",
  authenticate,
  authorize("admin"),
  validate(walletValidation.adminTopUp),
  walletController.adminDebitWallet
);
router.get(
  "/pending-requests",
  authenticate,
  authorize("admin"),
  walletController.getPendingTopUpRequests
);
router.post(
  "/requests/:transactionId/process",
  authenticate,
  authorize("admin"),
  validate(walletValidation.processTopUpRequest),
  walletController.processTopUpRequest
);
router.get(
  "/analytics",
  authenticate,
  authorize("admin"),
  walletController.getWalletAnalytics
);
router.get(
  "/admin-transactions",
  authenticate,
  authorize("admin"),
  walletController.getAdminTransactions
);

export default router;
