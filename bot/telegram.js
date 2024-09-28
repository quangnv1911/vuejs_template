import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
config();

const token = process.env.telegrambot_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const sendNewOrderMessage = (order) => {
    var htmlMessage =
        `     🛒  Bạn có đơn hàng mới 🚨🚨🚨!!!
    
👤  Tên khách hàng: ${order.customerName}
☎️  Số điện thoại người đặt: ${order.customerPhone}

💬  Tên người nhận: ${order.receiverName.length > 0 ? order.receiverName : order.customerName}
📞  Số điện thoại người nhận: ${order.receiverPhone.length > 0 ? order.receiverPhone : order.customerPhone}
🏠  Địa chỉ giao hàng: ${order.customerAddress}

🚛  Hình thức giao: ${order.shippingType}
⚠️  Trạng thái giao hàng: ${order.status ? 'Đã giao': 'Chưa giao'}
💵  Tổng giá trị đơn hàng: ${order.total.toLocaleString('vi-VN')} (đồng)

🔗  Bearpo Admin: https://bearpo-admin.vercel.app/
        `

    bot.sendMessage(process.env.telegram_groupid, htmlMessage);
}

export default {
    sendNewOrderMessage
}