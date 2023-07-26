import express from 'express';
import itemsRouter from './routes/items.route.js';

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
    this.app.use('/api', itemsRouter, (error, request, response) => {
      response.status(400).json({
        success: false,
        error: error.message,
      });
    });

    this.app.use('/ping', (req, res, next) => {
      return res.status(200).json({ message: 'pong' });
    });
  };
}
