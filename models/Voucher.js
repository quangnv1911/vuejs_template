import mongoose, { Schema } from "mongoose";

const voucherSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
    expiryDate: {
        type: Date,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

const Voucher = mongoose.model('vouchers', voucherSchema);
export default Voucher;
