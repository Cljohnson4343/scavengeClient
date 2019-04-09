export const compose = (...fns) => x => (fns.reduceRight((f, g) => g(f), x));
    
export const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

export const trace = label => value => {
    console.log(`${label}`);
    console.log(`value: ${value}`);

    return value;
}