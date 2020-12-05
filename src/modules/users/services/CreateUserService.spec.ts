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
