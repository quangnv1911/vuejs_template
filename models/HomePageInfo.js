import mongoose, { Schema } from "mongoose";

const homePageInfoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        validate: {
            validator: function(arr) {
                return arr.length <= 5; // Kiểm tra số lượng phần tử không vượt quá 5
            },
            message: 'Images must have at most 5 elements.' // Thông báo lỗi nếu số lượng phần tử vượt quá 5
        }
    }
});

const HomePageInfo = mongoose.model('homePageInfos', homePageInfoSchema);
export default HomePageInfo;