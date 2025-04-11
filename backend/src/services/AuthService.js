import UnauthorizedError from "../errors/Unauthorized.js";
import UserRepository from "../repositories/UserRepository.js";
import { generateAccessToken } from "../utils/functions.js";

class AuthService {
  constructor() {
    this.repository = new UserRepository();
  }

  async login(email, password) {
    const user = await this.repository.checkPassword(email, password);
    if (!user) throw new UnauthorizedError();
    return {
      access_token: generateAccessToken(user),
      created_at: new Date().toISOString(),
      expires_in: parseInt(process.env.JWT_EXPIRES_IN, 10) * 3600
    }
  }
}

export default AuthService;
