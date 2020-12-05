```ts
class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UserRepository();
    const users = await usersRepository.findAll();
    return response.json(users);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
    });

    return response.json(user);
  }
}
export default UserController;
```
