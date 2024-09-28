import Account from './account.js';
import Category from './category.js';
import HomePageInfo from './homePageInfo.js';
import Order from './order.js';
import OrderDetail from './orderDetail.js';
import Product from './product.js';
import Voucher from './voucher.js';

const routes = (app) => {
    app.use('/api/v1/account', Account)
    app.use('/api/v1/category', Category)
    app.use('/api/v1/homePageInfo', HomePageInfo)
    app.use('/api/v1/order', Order)
    app.use('/api/v1/orderDetail', OrderDetail)
    app.use('/api/v1/product', Product)
    app.use('/api/v1/voucher', Voucher)
}

export default routes;