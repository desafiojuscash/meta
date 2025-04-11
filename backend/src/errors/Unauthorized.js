export default class UnauthorizedError extends Error {
  constructor(message = "Email ou senha incorretos") {
    super(message);
    this.name = "Unauthorized";
  }
}
