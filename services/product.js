import Product from "../models/Product.js";
const createProduct = async (productData) => {
    try {
        return await Product.create(productData);
    } catch (error) {
        throw new Error(error);
    }
};

const updateProduct = async (productId, productData) => {
    try {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

const deleteProduct = async (productId) => {
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (error) {
        throw new Error(error);
    }
};

const getAllProduct = async (role) => {
    try {
        var condition = {
            $or: [
                { isHide: false, },
                { isHide: { $exists: false } }
            ],
            quantity: { $gt: 0 }
        };

        if (role && role === 'admin') {
            condition = {
                $or: [
                    { isHide: false, },
                    { isHide: { $exists: false } }
                ]
            }
        }
        // find All product that not hide
        const products = await Product.find(condition).populate('category', 'name');

        var newProducts = products.map(product => {
            product._doc.categoryId = product._doc.category._id;
            product._doc.category = product._doc.category.name;

            return product;
        })
        return newProducts;
    } catch (error) {
        throw new Error(error);
    }
};

const decreaseProductQuantity = async (productId, amount) => {
    try {
        // find All product that not hide
        const product = await Product.findById(productId);

        return await Product.findByIdAndUpdate(productId, {
            quantity: (product.quantity - amount)
        })
    } catch (error) {
        throw new Error(error);
    }
}

const checkProductQuantity = async (products) => {
    try {
        var flag = {
            message: 'TRUE',
            value: true
        };
        for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].product);

            if (!product) {
                throw new Error('Lỗi gì đó đã xảy ra, vui lòng thử lại!');
            }

            if (product.quantity < products[i].quantity) {
                throw new Error(`Sản phẩm "${product.name}" chỉ còn lại số lượng: ${product.quantity}`);
            }
        }
        return flag;
    } catch (error) {
        return {
            message: error.message,
            value: false
        }
    }
}

const searchProductByName = async (search) => {
    try {
        // search by product name which isHide = false
        const products = await Product.find({
            $or: [
                { isHide: false, },
                { isHide: { $exists: false } }
            ],
            name: {
                $regex: search,
                $options: "i"
            }
        }).populate('category', 'name');

        var newProducts = products.map(product => {
            product._doc.categoryId = product._doc.category._id;
            product._doc.category = product._doc.category.name;

            return product;
        })
        return newProducts;
    } catch (error) {
        throw new Error(error);
    }
}

const getProductById = async (productId) => {
    try {
        console.log('productId', productId);
        // find All product that not hide and quantity > 0
        const products = await Product.findOne({
            _id: productId,
            $or: [
                { isHide: false, },
                { isHide: { $exists: false } }
            ],
            quantity: { $gt: 0 },
        }).populate('category', 'name');

        return products;
    } catch (error) {
        throw new Error(error);
    }
};

export default {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    decreaseProductQuantity,
    checkProductQuantity,
    searchProductByName,
    getProductById
}