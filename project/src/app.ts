import express, { Router } from 'express';
import connectToDatabase from './connection';
import HanldeError from './middlewares/HandleError';

require('express-async-errors');

class App {
  public app: express.Application;

  public handleError = new HanldeError();

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public startServer(PORT: string | number = 3001): void {
    connectToDatabase();
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
    this.app.use(this.handleError.genericError);
  }

  public getApp() {
    return this.app;
  }
}

export default App;
