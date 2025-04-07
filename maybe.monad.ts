export class Maybe<T> {
    private constructor(private readonly value: T | null) {}

    // Creates a Maybe that contains a value
    static just<T>(value: T): Maybe<T> {
        return new Maybe(value);
    }

    // Creates an empty Maybe
    static nothing<T>(): Maybe<T> {
        return new Maybe<T>(null);
    }

    // Alias for just - unit function in monad terminology
    static of<T>(value: T): Maybe<T> {
        return Maybe.just(value);
    }

    // Apply a function to the value if it exists
    map<U>(fn: (value: T) => U): Maybe<U> {
        if (this.value === null) {
            return Maybe.nothing<U>();
        }
        return Maybe.just(fn(this.value));
    }

    // Bind (flatMap) - chain function in monad terminology
    bind<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
        if (this.value === null) {
            return Maybe.nothing<U>();
        }
        return fn(this.value);
    }

    // Alternative name for bind, commonly used in many implementations
    flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
        return this.bind(fn);
    }

    // Get the value or return a default
    getOrElse(defaultValue: T): T {
        return this.value !== null ? this.value : defaultValue;
    }

    // Check if this Maybe has a value
    isJust(): boolean {
        return this.value !== null;
    }

    // Check if this Maybe is empty
    isNothing(): boolean {
        return this.value === null;
    }
}
