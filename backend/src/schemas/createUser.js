export default {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
      pattern:
        "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()+_=`~{}\\[\\]|:;\"'<>,.?/\\\\-]).+$",
    },
  },
  additionalProperties: false,
};
