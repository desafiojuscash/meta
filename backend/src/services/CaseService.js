import CaseRepository from "../repositories/CaseRepository.js";
import LawyerRepository from "../repositories/LawyerRepository.js";

class CaseService {
  constructor() {
    this.caseRepository = new CaseRepository();
    this.lawyerRepository = new LawyerRepository();
  }

  async createCaseWithLawyers(caseData, lawyerDataList) {
    const documents = lawyerDataList.map(l => l.document);

    const existingLawyers = await this.lawyerRepository.findEntitiesByDocuments(documents);
    const existingDocs = existingLawyers.map(l => l.document);

    const newLawyersData = lawyerDataList.filter(l => !existingDocs.includes(l.document));
    const newLawyers = await this.lawyerRepository.createMany(newLawyersData);
    const newLawyerEntities = await this.lawyerRepository.findEntitiesByDocuments(
      newLawyers.map(l => l.document)
    );

    const allLawyerEntities = [...existingLawyers, ...newLawyerEntities];

    const createdCaseEntity = await this.caseRepository.createEntity(caseData);

    const caseWithLawyers = await this.caseRepository.associateLawyers(createdCaseEntity, allLawyerEntities);
    return caseWithLawyers;
  }

  async listCases({ page, filters }) {
    const PAGE_SIZE = 30;
    const offset = (page - 1) * PAGE_SIZE;
  
    return await this.caseRepository.findAll({
      offset,
      limit: PAGE_SIZE,
      filters
    });
  }

  async getCaseById(id) {
    return await this.caseRepository.findByIdWithLawyers(id);
  }

  async updateCaseStatus(id, newStatus) {
    const validTransitions = {
      todo: ["doing"],
      doing: ["review"],
      review: ["done", "doing"],
      done: []
    };
  
    const caseEntity = await this.caseRepository.findById(id);
  
    if (!caseEntity) {
      return null;
    }
  
    const currentStatus = caseEntity.status;
  
    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new Error(
        `Transição de status inválida: de "${currentStatus}" para "${newStatus}"`
      );
    }
  
    caseEntity.status = newStatus;
    await caseEntity.save();
  
    return caseEntity;
  }
  
}

export default CaseService;
