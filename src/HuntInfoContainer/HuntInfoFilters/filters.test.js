import * as f from './filters';
import hunts from '../../HuntInfoData';
import * as _ from 'underscore';
import * as hunt from '../../hunt';

test('teamsGreaterThan should return function that returns arg if filter is true', () => {
    const numTeams = hunt.maxTeams(hunts[0]);
    const greaterThan = f.teamsGreaterThan(numTeams - 1);

    const ret = greaterThan(hunts[0]);

    expect(typeof(greaterThan) === 'function').toBeTruthy;
    expect(_.isEqual(ret, hunts[0])).toBeTruthy;
});

test('teamsGreaterThan should return false when filter is false', () => {
    const numTeams = hunt.maxTeams(hunts[0]);
    const lessThan = f.teamsGreaterThan(numTeams + 1);

    const ret = lessThan(hunts[0]);

    expect(typeof(lessThan) === 'function').toBeTruthy;
    expect(ret).toBeFalsy;
});

test('itemsGreaterThan should return a function', () => {
    expect(typeof(f.itemsGreaterThan(2)) === 'function').toBeTruthy;
});

test("itemsGreaterThan's ret fn should return arg when filter is true", () => {
    const x = {...hunts[0]};
    const numItems = hunt.items.length;

    const greaterThan = f.itemsGreaterThan(numItems - 1);

    expect(_.isEqual(x, greaterThan(x))).toBeTruthy;
});

test("itemsGreaterThan's ret fn should return false when filter is false", () => {
    const x = {...hunts[0]};
    const numItems = hunt.items.length;

    const lessThan = f.itemsGreaterThan(numItems + 1);

    expect(_.isEqual(x, lessThan(x))).toBeFalsy;
});

test('filterWrapper should return a function', () => {
    expect(typeof(f.filterWrapper(hunt.isOpen)) === 'function').toBeTruthy;
})

test('filterWrapper should ret fn that returns false if arg is false', () => {
    expect(f.filterWrapper(hunt.isOpen)(false)).toBeFalsy;
})

test('filterWrapper should not interfere with wrapped fn if arg is truthy', () => {
    const x = {...hunts[0]};
    const numItems = hunt.items.length;

    const greaterThan = f.filterWrapper(f.itemsGreaterThan(numItems - 1));

    expect(_.isEqual(x, greaterThan(x))).toBeTruthy;

})