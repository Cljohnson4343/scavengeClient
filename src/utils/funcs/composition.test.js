import { compose, pipe } from './composition';

const add = a => b => (a + b);
const add1 = add(1);

const divide = a => b => (b/a);
const half = divide(2);

test("composes two functions and returns a function", () => {
    const add2 = compose(add1, add1);

    expect(add2).toBeInstanceOf(Function);
    expect(add2(3)).toBe(5);
});

test("composes fist fn with second fn", () => {
    expect(compose(add1, half)(6)).toBe(4);
})

test("composes more than two functions", () => {
    const add4 = compose(add1, add1, add1, add1);

    expect(add4(3)).toBe(7);
});

test("pipes two functions and returns a function", () => {
    const add2 = pipe(add1, add1);

    expect(add2).toBeInstanceOf(Function);
    expect(add2(3)).toBe(5);
});

test("pipes output from fist fn to second fn", () => {
    expect(pipe(half, add1)(6)).toBe(4);
})

test("pipes more than two functions", () => {
    const add4 = pipe(add1, add1, add1, add1);

    expect(add4(3)).toBe(7);
});