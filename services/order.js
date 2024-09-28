import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";

const dashboardStatic = async (fromDate, toDate) => {
    try {
        var condition;
        var total = 0;
        var totalProfit = 0;
        fromDate = new Date(fromDate);
        toDate = new Date(toDate);
        toDate.setHours(23, 59, 59, 999);
        // var map = new Map();
        // const monthAbbreviations = [
        //     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        // ];


        if (fromDate === '' && toDate === '') { //Case: getAll
            condition = {}
        } else {
            //Case: get by date
            condition = {
                createdAt: {
                    $gte: fromDate,
                    $lte: toDate
                }
            }
        }

        const dashboardStatic = await Order.find(condition, 'total totalProfit createdAt');
        const orderDetails = await OrderDetail.find(condition, 'quantity');
        var numberProduct = 0;
        for (let i = 0; i < orderDetails.length; i++) {
            numberProduct += orderDetails[i].quantity;
        }

        for (let i = 0; i < dashboardStatic.length; i++) {
            total += dashboardStatic[i].total;
            totalProfit += dashboardStatic[i].totalProfit;

        }
        
        return {
            total,
            totalProfit,
            numberOrder: dashboardStatic.length,
            numberProduct: numberProduct
        }

    } catch (error) {
        console.log('Service: dashboardStatic', error);
    }
}

const getRevenueProfitByYear = async (year) => {
    try {
        const profits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const revenues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const revAndPro = await Order.find({
            createdAt: {
                $gte: `${year}-01-01`,
                $lte: `${year}-12-31`
            }
        }, 'total totalProfit createdAt')

        revAndPro.forEach(element => {
            let month = element.createdAt.getMonth(); //start at 0

            profits[month] += element.totalProfit;
            revenues[month] += element.total;
        })


        return {
            revenues,
            profits,
            year
        };
    } catch (error) {
        console.log('Service: getRevenueProfitByYear', error);
    }
};

const createOrder = async (orderData) => {
    try {
        return await Order.create(orderData);
    } catch (error) {
        throw new Error(error);
    }
}

//getAllOrder with Condtion
const getAllOrder = async (page, numberPerPage, condition) => {
    try {
        const orders = await Order.find(condition)
            .sort({ createdAt: -1, _id: 1 })
            .skip((page - 1) * numberPerPage)
            .limit(numberPerPage);
        return orders;
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
};

//getOrderById
const getOrderById = async () => {
    try {
        return await Order.find({ id });
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
};

//updateOrder
const updateOrder = async (_id, order) => {
    try {
        const orderUpdate = await Order.findOneAndUpdate({ _id: _id }, order);
        return orderUpdate;
    } catch (error) {
        throw new Error('Service: updateOrder error', error);
    }
};

const getRatioReturningCustomerAndNewCustomer = async (year) => {
    try {
        const returningCustomers = [[], [], [], [], [], [], [], [], [], [], [], []];
        const newCustomers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const orders = await Order.find({
            createdAt: {
                $gte: `${year}-01-01`,
                $lte: `${year}-12-31`
            }
        }, 'customerPhone createdAt').sort({ createdAt: 1 });


        for (let i = 0; i < orders.length; i++) {
            const order = orders[i];
            const month = order.createdAt.getMonth();
            returningCustomers[month].push(order);
        }

        for (let i = 0; i < returningCustomers.length; i++) {
            var flag = false; // cờ đặt khi không có đơn nào trong tháng

            if(returningCustomers[i].length === 0){
                returningCustomers[i] = 0;
                flag = true;
            } else {
                returningCustomers[i] = calculateDuplicatePhoneRate(returningCustomers[i]).toFixed(4) * 100;
            }

            // nếu tháng đó không bán đơn nào thì newcustomer = 0%
            if(flag){
                newCustomers[i] = 0;
            } else {
                newCustomers[i] = 100 - returningCustomers[i];
            }
        }

        return {
            returningCustomers,
            newCustomers
        };
    } catch (error) {
        console.log('Service: getRevenueProfitByYear', error);
    }
};

function calculateDuplicatePhoneRate(customers) {
    const phoneCount = {};
    let duplicatePhones = 0;
    let totalPhones = customers.length;

    var listCusNotDuplicate = [];
    const phoneSet = new Set();
    for (const customer of customers) {
        if (!phoneSet.has(customer.customerPhone)) {
            listCusNotDuplicate.push(customer);
            phoneSet.add(customer.customerPhone);
        }
    }

    // Đếm số lần xuất hiện của mỗi số điện thoại và đồng thời tính số lượng số điện thoại trùng lặp
    customers.forEach(customer => {
        const phone = customer.customerPhone;
        if (phoneCount[phone]) {
            phoneCount[phone]++;
            // Chỉ tăng duplicatePhones khi gặp lần trùng lặp đầu tiên
            if (phoneCount[phone] === 2) {
                duplicatePhones++;
            }
        } else {
            phoneCount[phone] = 1;
        }
    });

    // Tính tỷ lệ số điện thoại trùng lặp trên tổng số điện thoại
    const duplicateRate = totalPhones === 0 ? 0 : (duplicatePhones / listCusNotDuplicate.length);

    return duplicateRate;
}

export default {
    dashboardStatic,
    getRevenueProfitByYear,
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrder,
    getRatioReturningCustomerAndNewCustomer
}