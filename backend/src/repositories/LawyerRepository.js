import { Lawyer } from "../models/index.js";
import { Sequelize } from "sequelize";

class LawyerRepository {
  constructor() {
    this.model = Lawyer;
  }

  async findByDocuments(documents) {
    const lawyers = await this.model.findAll({
      where: { document: documents },
    });

    return lawyers.map((lawyer) => ({
      id: lawyer.id,
      name: lawyer.name,
      document: lawyer.document,
      createdAt: lawyer.createdAt,
      updatedAt: lawyer.updatedAt,
    }));
  }

  async createMany(lawyersData) {
    const createdLawyers = [];

    for (const data of lawyersData) {
      try {
        const lawyer = await this.model.create(data);
        createdLawyers.push({
          id: lawyer.id,
          name: lawyer.name,
          document: lawyer.document,
          createdAt: lawyer.createdAt,
          updatedAt: lawyer.updatedAt,
        });
      } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
          continue;
        }
        throw error;
      }
    }

    return createdLawyers;
  }

  async findEntitiesByDocuments(documents) {
    return await this.model.findAll({
      where: { document: documents },
    });
  }
}

export default LawyerRepository;
