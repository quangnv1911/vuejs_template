import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import productRouter from './routes/product.js'
import categoryRouter from './routes/category.js';
import voucherRouter from "./routes/voucher.js";
import orderRouter from "./routes/order.js"
import bodyParser from 'body-parser';
import cors from 'cors';
config();


const app = express();
app.use('/public', express.static('public'));
const PORT = process.env.PORT || 3007;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect to MongoDB success");
    app.use(cors());

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    // app.use(bodyParser.json());

    routes(app);

    //crud products
    app.use("/api/products", productRouter);
    //crud categoty
    app.use("/api/categories", categoryRouter);
    //crud vouchers
    app.use("/api/vouchers", voucherRouter);

    app.use("/api/orders", orderRouter);


    app.listen(PORT, () => {
      console.log('Bearpo running on port ' + PORT);
    })
  } catch (err) {
    console.log(err);
  }
}

main();
