class EmailAlreadyExistsError extends Error {
  constructor(message = "Email já está em uso") {
    super(message);
    this.name = "EmailAlreadyExistsError";
  }
}

export default EmailAlreadyExistsError;