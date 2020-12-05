import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import routesError from '@shared/middlewares/routesError';
import routes from './routes';
import './container';

import '@shared/database';

class App {
  public express;

  constructor() {
    this.express = express();
    this.middlewares();
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(routes);
    this.express.use(routesError);
  }
}

export default new App().express;
