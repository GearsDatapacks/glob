export class LanguageError {
  protected _error: string;
  protected prefix: string = 'Error';

  constructor (error: string) {
    this._error = error;
  }

  protected format (): string {
    return this.prefix + ': ' + this._error;
  }

  get error () {
    return this.format();
  }
}

export class ParseError extends LanguageError {
  protected prefix: string = 'ParseError';
}
