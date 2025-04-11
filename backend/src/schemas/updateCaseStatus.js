const updateCaseStatus = {
    type: "object",
    required: [
      "status",
    ],
    properties: {
      status: { type: "string", enum: ['todo', 'doing', 'review', 'done'] },
    },
    additionalProperties: false
  };
  
  export default updateCaseStatus;
  