import { orderDetailService, orderService } from "../services/index.js";
const dashboardStatic = async (req, res) => {
    try {
        const { fromDate, toDate } = req.params;

        if (!fromDate || !toDate || (fromDate !== '' && toDate === '') || (fromDate === '' && toDate !== '') || fromDate > toDate) {
            return res.status(200).json({
                messages: 'Error'
            })
        }

        const dashboardStatic = await orderService.dashboardStatic(fromDate, toDate);
        const ratioRevenueAndProfit = await orderDetailService.ratioRevenueAndProfit(fromDate, toDate);
        return res.status(200).json({
            revenue: dashboardStatic.total,
            profit: dashboardStatic.totalProfit,
            numberOrder: dashboardStatic.numberOrder,
            numberProduct: dashboardStatic.numberProduct,
            staticOfProduct: ratioRevenueAndProfit
        });
    } catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}

const getOrderDetailById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id){
            return res.status(200).json({
                messages: 'Error'
            })
        }

        const ratioRevenueAndProfit = await orderDetailService.getOrderDetailById(id);
        return res.status(200).json(ratioRevenueAndProfit);
    } catch (error) {
        res.status(500).json({
            messages: error.toString()
        })
    }
}

export default {
    dashboardStatic,
    getOrderDetailById
}