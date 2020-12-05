```ts
interface IUserDTO {
  name: string;
  email: string;
}

export default IUserDTO;


import User from '@modules/users/entities/User';
import IUserDTO from './IUserDTO';

interface IUserRepository {
  create(data: IUserDTO): Promise<User>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
}

export default IUserRepository;


```
