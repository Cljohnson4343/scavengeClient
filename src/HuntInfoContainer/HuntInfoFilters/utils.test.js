import { addFilter, isEqual, removeFilter } from './utils';
import { filtersObj } from './filters';

const testFilter = {
    displayString: 'test filter',
};

const filtersArr = Object.keys(filtersObj).map(key => filtersObj[key]);

test('isEqual returns function that returns true when using same filter', () => {
    expect(isEqual(testFilter)(testFilter)).toBeTruthy;
});

test('isEqual returns function that returns false when using different filters', () => {
    expect(isEqual(testFilter)({displayString: 'another one'})).not.toBeTruthy;
});

test('addFilter adds a filter and returns a new array', () => {
    const newFilters = addFilter(filtersArr, testFilter);

    expect(newFilters.length).toBe(filtersArr.length + 1);
    expect(filtersArr.findIndex(isEqual(testFilter))).toBe(-1);
    expect(newFilters.findIndex(isEqual(testFilter))).toBeGreaterThan(-1);

});

test('addFilter does not add  a duplicate filter', () => {
    const newFilters = addFilter(filtersArr, testFilter);
    const newFilters2 = addFilter(newFilters, testFilter);

    expect(newFilters.length).toBe(newFilters2.length);

});

test('removeFilter removes a filter and returns a new array', () => {
    const newFilters = addFilter(filtersArr, testFilter);

    const origFilters = removeFilter(newFilters, testFilter);

    expect(origFilters.length).toBe(filtersArr.length);
    expect(origFilters.findIndex(isEqual(testFilter))).toBe(-1);
});

test("removeFilter does not remove a filter arg isn't in array", () => {
    const newFilters = removeFilter(filtersArr, testFilter);

    expect(newFilters.length).toBe(filtersArr.length);
});