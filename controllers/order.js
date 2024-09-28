import Order from "../models/Order.js";
import { orderService, orderDetailService, productService } from "../services/index.js";
import TelegramBot from '../bot/telegram.js'

const getRevenueAndProfitByYear = async (req, res) => {
  try {
    const { year } = req.params;

    if (!year || year === '') {
      return res.status(200).json({
        messages: 'Error'
      })
    }

    const dashboardStatic = await orderService.getRevenueProfitByYear(year);
    return res.status(200).json(dashboardStatic);

  } catch (error) {
    res.status(500).json({
      messages: error.toString()
    })
  }
}

const createOrder = async (req, res) => {
  try {
    const { listCart, ...aOrder } = req.body;
    var { voucher } = aOrder ;
    if(voucher === "") 
      voucher = null;

    const order = await orderService.createOrder({
      ...aOrder,
      voucher
    });
    
    const listCartVer2 = listCart.map(p => ({
      product: p._id,
      order: order._id,
      quantity: p.quantity,
      importPrice: p.importPrice,
      sellPrice: (p.sellPrice - (p.sellPrice * (p.discount / 100)))
    }));


    const lsOrderDetail = await Promise.all(
      listCartVer2.map(async (p) => {
        const orderDetail = await orderDetailService.createOrderDetail(p);
        const updateProduct = await productService.decreaseProductQuantity(p.product, p.quantity);
        return orderDetail;
      })
    );

    TelegramBot.sendNewOrderMessage(order);
    return res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      error: error.toString()
    })
  }
}

//getAllOrder with condition
const getAllOrder = async (req, res) => {
  try {
    var { page, numberPerPage, delivered, notDelivered, search } = req.query;

    if (!page)
      page = 1;

    if (!numberPerPage)
      numberPerPage = 5;

    if (!delivered)
      delivered = true;

    if (!notDelivered)
      notDelivered = true;

    if (!search)
      search = '';

    var condition = {};

    // filter theo trang thai don hang
    if (delivered !== notDelivered) {
      condition.status = delivered;
    }

    // filter theo ten khach hang, sdt, dia chi, ten nguoi nhan, sdt nguoi nhan
    if (search !== '') {
      condition.$or = [
        { customerName: { $regex: new RegExp(search, 'i') } },
        { customerPhone: { $regex: new RegExp(search, 'i') } },
        { customerAddress: { $regex: new RegExp(search, 'i') } },
        { receiverName: { $regex: new RegExp(search, 'i') } },
        { receiverPhone: { $regex: new RegExp(search, 'i') } },
      ]
    }


    const orders = await orderService.getAllOrder(page, numberPerPage, condition);

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//getPagination
const getPagination = async (req, res) => {
  try {
    
    const delivered = req.query.delivered || true;
    const notDelivered = req.query.notDelivered || true;
    const search = req.query.search || '';

    var condition = {};
    // filter theo trang thai don hang
    if (delivered !== notDelivered) {
      condition.status = delivered;
    }

    // filter theo ten khach hang, sdt, dia chi, ten nguoi nhan, sdt nguoi nhan
    if (search !== '') {
      condition.$or = [
        { customerName: { $regex: new RegExp(search, 'i') } },
        { customerPhone: { $regex: new RegExp(search, 'i') } },
        { customerAddress: { $regex: new RegExp(search, 'i') } },
        { receiverName: { $regex: new RegExp(search, 'i') } },
        { receiverPhone: { $regex: new RegExp(search, 'i') } },
      ]
    }
    const totalCount = await Order.countDocuments(condition);
    const limit = parseInt(req.query.limit) || 5;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = parseInt(req.query.page) || 1;

    let pagination = [];
    const maxVisiblePages = 5; // Số lượng trang hiển thị tối đa

    // Tính toán các con số phân trang
    if (totalPages <= maxVisiblePages) {
      pagination = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const halfVisiblePages = Math.floor(maxVisiblePages / 2);
      let startPage = currentPage - halfVisiblePages;
      let endPage = currentPage + halfVisiblePages;

      if (startPage <= 0) {
        startPage = 1;
        endPage = maxVisiblePages;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxVisiblePages + 1;
      }

      pagination = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }

    res.json({
      pagination,
      totalPages,
      currentPage
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//getOrderById
const getOrderById = async (req, res) => {
  try {
    const order = await orderService.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateOrder = async (req, res) => {
  try {
    const { id, order } = req.body;

    if (!id || !order) {
      return res.status(200).json({
        messages: 'Error'
      })
    }

    const orderUpdate = await orderService.updateOrder(id, order);
    return res.status(200).json(orderUpdate);

  } catch (error) {
    res.status(500).json({
      messages: error.toString()
    })
  }
}

const getRatioReturningCustomerAndNewCustomer = async (req, res) => {
  try {
    const { year } = req.params;

    if (!year) {
      return res.status(200).json({
        messages: 'Error'
      })
    }

    const ratio = await orderService.getRatioReturningCustomerAndNewCustomer(year);
    return res.status(200).json(ratio);

  } catch (error) {
    res.status(500).json({
      messages: error.toString()
    })
  }
}

export default {
  getRevenueAndProfitByYear,
  createOrder,
  getAllOrder,
  getOrderById,
  getPagination,
  updateOrder,
  getRatioReturningCustomerAndNewCustomer
}