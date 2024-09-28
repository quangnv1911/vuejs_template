import express from 'express';
import voucherController from "../controllers/voucher.js";

const router = express.Router();
router.post("/", voucherController.createVoucher);
router.get("/", voucherController.getAllVouchers);
router.get("/:code", voucherController.getVoucherByCode);
router.put("/:code", voucherController.updateVoucher);
router.delete("/:code", voucherController.deleteVoucher);

export default router;
