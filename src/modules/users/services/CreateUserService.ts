import User from '@modules/users/entities/User';
import AppError from '../../../shared/error/AppError';
import IUserDTO from '../interfaces/IUserDTO';
import IUserRepository from '../interfaces/IUserRepository';

class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

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
