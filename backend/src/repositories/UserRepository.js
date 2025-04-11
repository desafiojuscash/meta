import { User } from "../models/index.js";
import { Sequelize } from "sequelize";
import bcrypt from 'bcrypt';
import EmailAlreadyExistsError from "../errors/EmailAlreadyExists.js";

class UserRepository {
  constructor() {
    this.model = User;
  }

  async create(data) {
    try {
      const user = await this.model.create(data);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new EmailAlreadyExistsError();
      }
      throw error;
    }
  }

  async checkPassword(email, plainPassword) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(plainPassword, user.password);
    if (!isMatch) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}

export default UserRepository;
export { EmailAlreadyExistsError };
