```ts
/**
 * EXAMPLE DE FAKEREPOSITORY *
 */
import { v4 as uuid } from 'uuid';
import User from '@modules/users/entities/User';
import IUserDTO from '../interfaces/IUserDTO';
import IUserRepository from '../interfaces/IUserRepository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create(data: IUserDTO): Promise<User> {
    const { name, email } = data;

    const user = new User();

    Object.assign(user, { id: uuid(), name, email });

    this.users.push(user);

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }
}
export default FakeUserRepository;

/**
 * EXAMPLE DE REPOSITORY *
 */

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = this.repository.find();
    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.repository.findOne({
      where: { email },
    });
    return findUser;
  }
}

export default UserRepository;


```
