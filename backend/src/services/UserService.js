import UserRepository from "../repositories/UserRepository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async createUser(body) {
    const user = await this.repository.create(body);
    return user;
  }
}

export default UserService;
