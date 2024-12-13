export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ExternalApiError extends Error {
  constructor(message: string = "External API error") {
    super(message);
    this.name = "ExternalApiError";
  }
}