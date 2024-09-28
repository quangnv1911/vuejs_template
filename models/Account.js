import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
});

const Account = mongoose.model('accounts', accountSchema);
export default Account;