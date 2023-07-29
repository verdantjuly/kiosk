import express from 'express';
import itemsRouter from './routes/items.route.js';
import order_itemsRouter from './routes/order_items.route.js';
import receiptsRouter from './routes/receipts.route.js';
import optionsRouter from './routes/options.route.js';
import OptionsRepository from './repositories/options.repository.js';
import myCache from './cache.js';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
    this.setAppRouter();
  }

  setAppSettings = async () => {
    this.app.use(express.json());
    const optionsRepository = new OptionsRepository();
    const options = optionsRepository.getoptions;
    const success = myCache.set('options', options, 10000);
    if (success) {
      console.log('cache success');
    } else {
      console.log('cache failed');
    }
  };
  setAppRouter = () => {
    this.app.use(
      '/api',
      [itemsRouter, order_itemsRouter, receiptsRouter, optionsRouter],
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
