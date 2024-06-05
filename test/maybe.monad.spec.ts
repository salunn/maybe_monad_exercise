import { describe, it } from "node:test";
import { Maybe } from "../maybe.monad.ts";
import { equal } from "assert";
import { elevate } from "../supplierService.ts";

describe("maybe monad", () => {
    it("initializes correctly", () => {
        const monad = Maybe.of('kuikka');
        equal(monad.value, 'kuikka');
    })

    it("transforms with map", () => {
        const monad = Maybe.of('kuikka');
        const result = monad.map((value: string): number => value.length);
        equal(result.value, 6);
    })

    it("transforms with undefined", () => {
        const monad = Maybe.tyhjä<string>();
        const result = monad.map((value: string): number => value.length);
        equal(result.value, undefined);
    })

    it('transforms with flatMap', () => {
        const monad = Maybe.of('kuikka');
        const result = monad.flatMap((value: string): Maybe<number> => Maybe.of(value.length));
        equal(result.value, 6);        
    })

    it('transforms undefined with flatMap', () => {
        const monad = Maybe.tyhjä<string>();
        const result = monad.flatMap((value: string): Maybe<number> => Maybe.of(value.length));
        equal(result.value, undefined);        
    })

    it('chains', () => {
        const monad = Maybe.of('kuikka');

        const result = monad.chain([
            elevate((s: string): number => s.length), 
            // @ts-ignore
            elevate((i: number) => i*2)
        ])

        equal(result.value, 12);
    })

    it('chains promises', async () => {
        const monad = Maybe.of('kuikka');

        const result = await monad.asyncChain([
            (s: string) => Promise.resolve(Maybe.of(s.length)), 
        ])

        equal(result.value, 6);
    })

    it('chains promises and non promises', async () => {
        const monad = Maybe.of('kuikka');

        const result = await monad.asyncChain([
            (s: string) => Promise.resolve(Maybe.of(s.length)), 
            // @ts-ignore
            (i: number) => i*2
        ])

        equal(result.value, 12);
    })
    it('chains ground level', () => {
        const monad = Maybe.of('kuikka');

        const result = monad.chain([
            (s: string): number => s.length, 
            // @ts-ignore
            (i: number) => i*2
        ])

        equal(result.value, 12);
    })

    it('chains INFERNAL corner case', () => {
        const monad = Maybe.of('kuikka');

        const result = monad.chain([
            (s: string): Maybe<number> => Maybe.fromValue(s.length), 
            // @ts-ignore
            (i: number) => i*2
        ])

        equal(result.value, 12);
    })

    it('chains DIABOLICAL corner case', () => {
        const monad = Maybe.of('kuikka');

        const result = monad.chain([
            (s: string): any => ({value: s.length}), 
            // @ts-ignore
            (i: number) => i*2
        ])

        equal(result.value, 12);
    })
})
