type HeadTail<L extends Array<any>> =
    ((...args: L) => void) extends ((x: infer H, ...args: infer T) => void) ?
        [H, T] :
        never;

type Head<L extends Array<any>> =
    HeadTail<L>[0];

type Tail<L extends Array<any>> =
    HeadTail<L>[1];

type ChainFunctions<F extends Array<Function>> = ((...args: HeadTail<F>) => unknown)[]

function isMonad<T extends any>(m: unknown): m is Maybe<T> {
    if(typeof m !== 'object') return false;
    // @ts-ignore
    return 'value' in m;
}

export class Maybe<T> {
    constructor(public readonly value: T) {}

    static of<T>(value: T): Maybe<T> {
        return new Maybe(value);
    }

    static tyhjä<T>(): Maybe<T> {
        return new Maybe<T>(undefined as T);
    }

    static fromValue<T>(value: T | undefined): Maybe<T> {
        return value ? Maybe.of(value) : Maybe.tyhjä();
    } 

    map<R>(fn: (x: T) => R): Maybe<R> {
        if (this.value === undefined) return Maybe.tyhjä();
        return Maybe.of(fn(this.value));
    }

    flatMap<R>(fn: (x: T) => Maybe<R>): Maybe<R> {
        if (this.value === undefined) return Maybe.tyhjä();
        return fn(this.value);
    }

    chain<T1, R>(arr: Array<(x: T1) => R | Maybe<R>>): Maybe<R> {
        // @ts-ignore
        return arr.reduce((acc, cur) => {
            if (!isMonad(acc)) {
                const result = cur(acc)
                return !isMonad(result) ? Maybe.fromValue(result) : result;
            }
            if (acc.value === undefined) return Maybe.tyhjä();
            // @ts-ignore
            const result = cur(acc.value)
            return !isMonad(result) ? Maybe.fromValue(result) : result;
        }, this as Maybe<T>)
    }

    async asyncChain<T,R>(arr: Array<(x: T) => R>): Promise<Maybe<R>> {
        // @ts-ignore
        return arr.reduce(async (acc, cur) => {
            const awaitedAcc = await acc
            if (!isMonad(awaitedAcc)) {
                const result = await cur(awaitedAcc)
                return !isMonad(result) ? Maybe.fromValue(result) : result;
            }
            if (awaitedAcc.value === undefined) return Maybe.tyhjä();
            // @ts-ignore
            const result = await cur(awaitedAcc.value)
            return !isMonad(result) ? Maybe.fromValue(result) : result;
        }, Promise.resolve(this))
    }
}
