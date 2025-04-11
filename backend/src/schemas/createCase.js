const caseSchema = {
    type: "object",
    required: [
      "content",
      "publicationDate"
    ],
    properties: {
      publicationDate: { type: "string", format: "date-time" },
      caseNumber: { type: "string" },
      authors: { type: "string" },
      content: { type: "string" },
      principalGrossNet: { type: "number", minimum: 0 },
      lateInterest: { type: "number", minimum: 0 },
      legalFees: { type: "number", minimum: 0 },
      lawyers: {
        type: "array",
        items: {
          type: "object",
          required: ["name", "document"],
          properties: {
            name: { type: "string", minLength: 1 },
            document: { type: "string", minLength: 1 }
          }
        }
      }
    },
    additionalProperties: false
  };
  
  export default caseSchema;
  