import EmailAlreadyExistsError from "../errors/EmailAlreadyExists.js";
import UserService from "../services/UserService.js";

class UserController {
  constructor () {
    this.service = new UserService();
  }

  async createUser (req, res) {
    const { body } = req;
    try {
      const user = await this.service.createUser(body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }

      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async login(req, res) {
    
  }
}

export default UserController;
