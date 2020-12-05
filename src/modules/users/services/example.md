```js
/**
 * EXAMPLE TEST *
 */
import AppError from '@shared/error/AppError';
import FakeUserRepository from '@modules/users/repositories/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUserRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able create a new user', async () => {
    const user = await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create user with email exists', async () => {
    await createUser.execute({
      name: 'user1',
      email: 'user1@email.com',
    });

    // await createUser.execute({
    //   name: 'user2',
    //   email: 'user1@email.com',
    // });

    await expect(
      createUser.execute({
        name: 'user1',
        email: 'user1@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

/**
 * EXAMPLE SERVICE *
 */

import { injectable, inject } from 'tsyringe';
import User from '@modules/users/entities/User';
import AppError from '../../../shared/error/AppError';
import IUserDTO from '../interfaces/IUserDTO';
import IUserRepository from '../interfaces/IUserRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email }: IUserDTO): Promise<User> {
    const findEmailUser = await this.userRepository.findByEmail(email);
    if (findEmailUser) {
      throw new AppError('Email is already in user');
    }

    const user = this.userRepository.create({
      name,
      email,
    });

    return user;
  }
}

export default CreateUserService;

```
