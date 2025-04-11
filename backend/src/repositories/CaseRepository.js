import { Case, Lawyer } from '../models/index.js';
import { Op, fn, col, where as sequelizeWhere } from "sequelize";

class CaseRepository {
  constructor() {
    this.model = Case;
  }

  async create(data) {
    const createdCase = await this.model.create(data);

    return {
      id: createdCase.id,
      caseNumber: createdCase.caseNumber,
      accused: createdCase.accused,
      authors: createdCase.authors,
      principalGrossNet: createdCase.principalGrossNet,
      lateInterest: createdCase.lateInterest,
      content: createdCase.content,
      legalFees: createdCase.legalFees,
      status: createdCase.status,
      publicationDate: createdCase.publicationDate,
      createdAt: createdCase.createdAt,
      updatedAt: createdCase.updatedAt
    };
  }

  async createEntity(data) {
    return await this.model.create(data);
  }

  async associateLawyers(caseInstance, lawyerEntities) {
    return await caseInstance.addLawyers(lawyerEntities);
  }

  async findAll({ offset = 0, limit = 30, filters = {} }) {
    const where = {};
  
    if (filters.term) {
      const term = filters.term.toLowerCase();
      where[Op.or] = [
        sequelizeWhere(fn("LOWER", col("Case.authors")), {
          [Op.like]: `%${term}%`
        }),
        sequelizeWhere(fn("LOWER", col("Case.caseNumber")), {
          [Op.like]: `%${term}%`
        })
      ];
    } else {
      if (filters.authors) {
        where[Op.and] = where[Op.and] || [];
        where[Op.and].push(sequelizeWhere(
          fn("LOWER", col("Case.authors")),
          {
            [Op.like]: `%${filters.authors.toLowerCase()}%`
          }
        ));
      }
    }
  
    if (filters.status) {
      where.status = filters.status;
    }
  
    if (filters.startDate && filters.endDate) {
      where.publicationDate = {
        [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
      };
    } else if (filters.startDate) {
      where.publicationDate = {
        [Op.gte]: new Date(filters.startDate)
      };
    } else if (filters.endDate) {
      where.publicationDate = {
        [Op.lte]: new Date(filters.endDate)
      };
    }
  
    const { count, rows } = await this.model.findAndCountAll({
      where,
      include: [
        {
          model: Lawyer,
          as: "Lawyers",
          through: { attributes: [] }
        }
      ],
      order: [["publicationDate", "DESC"]],
      limit,
      distinct: true,
      offset
    });
  
    return {
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: offset / limit + 1,
      data: rows
    };
  }

  async findByIdWithLawyers(id) {
    return await this.model.findByPk(id, {
      include: [
        {
          model: Lawyer,
          as: "Lawyers",
          through: { attributes: [] }
        }
      ]
    });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }
  
}

export default CaseRepository;
