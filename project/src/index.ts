import App from './app';
import UserController from './controllers/UserController';
import CustomRouter from './routes/router';
import { UserInfo } from './types/UserInfoType';
import { User } from './types/UserType';

const server = new App();
const userController = new UserController();
const userRouter = new CustomRouter<User | UserInfo>();
userRouter.addRoute(userController);
server.addRouter(userRouter.router);

export default server;