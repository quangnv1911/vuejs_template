import mongoose, { Schema } from "mongoose";
import Category from "./Category.js";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    importPrice: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    discountTime: {
        type: Date
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: Category,
        required: true
    },
    subdescription: {
        type: String,
    },
    isCombo: {
        type: Boolean,
        default: false
    },
    isHide: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, 'Quantity cannot be less than 0']
    },
    story: {
        type: String
    }
}, {
    timestamps: true
});

const Product = mongoose.model('products', productSchema);
export default Product;