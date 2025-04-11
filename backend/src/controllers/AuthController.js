import UnauthorizedError from "../errors/Unauthorized.js";
import AuthService from "../services/AuthService.js";
import { parseBasicAuthcHeader } from "../utils/functions.js";

class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  async login(req, res) {
    try {
      const { username, password } = parseBasicAuthcHeader(req.headers.authorization);
      const authData = await this.service.login(username, password);
      return res.status(200).json(authData);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return res.status(401).json({ message: error.message });
      }

      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default AuthController;
