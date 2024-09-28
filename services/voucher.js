import Voucher from "../models/Voucher.js";

 const createVoucher = async (voucherData) => {
    try {
        return await Voucher.create(voucherData);
    } catch (error) {
        throw new Error(error);
    }
};

 const getAllVouchers = async () => {
    try {
        return await Voucher.find();
    } catch (error) {
        throw new Error(error);
    }
};

 const getVoucherByCode = async (code) => {
    try {
        return await Voucher.findOne({ code });
    } catch (error) {
        throw new Error(error);
    }
};

 const updateVoucher = async (code, voucherData) => {
    try {
        return await Voucher.findOneAndUpdate({ code }, voucherData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

 const deleteVoucher = async (code) => {
    try {
        return await Voucher.findOneAndDelete({ code });
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    createVoucher,
    getAllVouchers,
    getVoucherByCode,
    updateVoucher,
    deleteVoucher
}
