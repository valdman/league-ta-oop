export class NeverError extends Error {
  constructor(value: never, message?: string) {
    const ammend = message ? `Message: ${message}` : "";
    super([`Unreachable statement: ${value}`, ammend].join(". "));
  }
}
