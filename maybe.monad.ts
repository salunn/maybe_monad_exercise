export class Maybe<T> {
  private constructor(private value: T | null) {}

  static some<T>(value: T) {
    return new Maybe(value);
  }

  static none<T>() {
    return new Maybe<T>(null);
  }

  static fromValue<T>(value: T): Maybe<T> {
    return value ? Maybe.some(value) : Maybe.none();
  }

  getOrNull() {
    return this.value ? this.value : null;
  }

  map<R>(fn: (input: T) => R): Maybe<R> {
    if (!this.value) {
      return Maybe.none();
    } else {
      return Maybe.some(fn(this.value));
    }
  }

  flatMap<R>(fn: (input: T) => Maybe<R>): Maybe<R> {
    if (!this.value) {
      return Maybe.none();
    }

    return fn(this.value);
  }
}
