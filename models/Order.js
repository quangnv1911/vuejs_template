import mongoose, { Schema } from "mongoose";
import Voucher from "./Voucher.js";

const orderSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String
    },
    receiverName: {
        type: String,
    },
    receiverPhone: {
        type: String,
    },
    total: {
        type: Number,
    },
    totalProfit: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    voucher: {
        type: Schema.Types.ObjectId,
        ref: Voucher,
    },
    note: {
        type: String,
    },
    shippingType: {
        type: String,
        default: 'Giao hàng tận nơi'
    }
}, {
    timestamps: true
});

const Order = mongoose.model('orders', orderSchema);
export default Order;