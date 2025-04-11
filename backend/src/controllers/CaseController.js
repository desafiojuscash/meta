import CaseService from "../services/CaseService.js";

class CaseController {
  constructor() {
    this.service = new CaseService();
  }

  async create(req, res) {
    try {
      const {
        caseNumber,
        accused,
        authors,
        principalGrossNet,
        lateInterest,
        legalFees,
        content,
        lawyers,
        publicationDate,
      } = req.body;

      const caseData = {
        caseNumber,
        accused,
        content,
        authors,
        principalGrossNet,
        lateInterest,
        legalFees,
        publicationDate,
      };

      const createdCase = await this.service.createCaseWithLawyers(
        caseData,
        lawyers
      );

      res.status(201).json({
        message: "Caso criado com sucesso",
        case: createdCase,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erro ao criar caso",
      });
    }
  }

  async list(req, res) {
    try {
      const { page = 1, authors, status, startDate, endDate, term } = req.query;

      const result = await this.service.listCases({
        page: parseInt(page, 10),
        filters: { authors, status, startDate, endDate, term },
      });

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao listar casos" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const caseData = await this.service.getCaseById(id);

      if (!caseData) {
        return res.status(404).json({ error: "Caso não encontrado" });
      }

      res.json(caseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar o caso" });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedCase = await this.service.updateCaseStatus(id, status);

      if (!updatedCase) {
        return res.status(404).json({ error: "Caso não encontrado" });
      }

      res.json({
        message: "Status atualizado com sucesso",
        case: updatedCase,
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: error.message || "Erro ao atualizar status" });
    }
  }
}

export default CaseController;
