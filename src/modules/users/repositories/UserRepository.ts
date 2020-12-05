import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/entities/User';
import ICreateUserDTO from '../interfaces/IUserDTO';
import IUserRepository from '../interfaces/IUserRepository';

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

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
