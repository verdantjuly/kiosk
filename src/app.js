import express from 'express';
import itemsRouter from './routes/items.route.js';
import order_itemsRouter from './routes/order_items.route.js';
import receiptsRouter from './routes/receipts.route.js';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = () => {
    this.app.use(express.json());
  };
  setAppRouter = () => {
    this.app.use(
      '/api',
      [itemsRouter, order_itemsRouter, receiptsRouter],
      (error, request, response, next) => {
        response.status(400).json({
          success: false,
          error: error.message,
        });
      },
    );

    this.app.use('/ping', (req, res, next) => {
      return res.status(200).json({ message: 'pong' });
    });
  };
}
