import { Router } from 'express';
import UserController from '../controllers/UsersController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.get('/', userController.index);
usersRouter.post('/', userController.store);

export default usersRouter;
