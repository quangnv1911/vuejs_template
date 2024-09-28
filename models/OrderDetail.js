import mongoose, { Schema } from "mongoose";
import Product from "./Product.js";
import Order from "./Order.js";

const orderDetailSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: Product,
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: Order,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    importPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const OrderDetail = mongoose.model('orderDetails', orderDetailSchema);
export default OrderDetail;