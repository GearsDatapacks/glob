export class LanguageError {
  protected _error: string;
  protected prefix: string = 'Error';

  constructor (error: string) {
    this._error = error;
  }

  protected format (): string {
    return `Uncaught ${this.prefix}: ${this._error}`;
  }

  get error () {
    return this.format();
  }
}

export class ParseError extends LanguageError {
  protected prefix: string = 'ParseError';
}

export class SyntaxError extends ParseError {
  protected prefix: string = 'SyntaxError';
}

export class RuntimeError extends LanguageError {
  protected prefix: string = 'RuntimeError';
}

export class TypeError extends RuntimeError {
  protected prefix: string = 'TypeError';
}
