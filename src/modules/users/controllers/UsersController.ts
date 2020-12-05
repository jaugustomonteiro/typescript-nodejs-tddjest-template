import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UserRepository();
    const users = await usersRepository.findAll();
    return response.json(users);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const usersRepository = new UserRepository();

    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,
      email,
    });

    return response.json(user);
  }
}

export default UserController;
