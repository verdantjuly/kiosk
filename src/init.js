import Http from 'http';
import { ExpressApp } from './app.js';
import sequelize from './db/sequelize.js';
import CacheInit from './cacheinit.js';
import Env from '../env.js';

export class Server {
  env = new Env();
  cacheinit = new CacheInit();
  expressApp = new ExpressApp();
  httpServer;

  constructor() {
    this.httpServer = new Http.Server(this.expressApp.app);
  }

  databaseConnection = () => {
    return this.sequelizeAuthenticate().then(this.sequelizeSync);
  };

  sequelizeAuthenticate = () => {
    // test connection
    return sequelize.authenticate();
  };

  sequelizeSync = () => {
    if (process.env.NODE_ENV === 'development')
      return sequelize.sync({ force: true });
  };

  runServer = async () => {
    try {
      await this.databaseConnection();
      await this.cacheinit.cacheinit();
      return this.serverListen();
    } catch (e) {
      return this.serverErrorHandler(e);
    }
  };

  serverListen = () => {
    return this.httpServer.listen(this.env.port, () => {
      console.log(
        `Server is running on: http://${this.env.host}:${this.env.port}`,
      );
    });
  };

  serverErrorHandler = error => {
    console.log('Server run error: ', error.message);
  };
}

const server = new Server();

server.runServer();
