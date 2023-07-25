import express from 'express';

export class ExpressApp {
  app = express();

  constructor() {
    this.setAppSettings();
  }

  setAppSettings = () => {
    this.app.use(express.json());
  };
}
