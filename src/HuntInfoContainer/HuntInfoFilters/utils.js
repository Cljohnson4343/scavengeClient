export const isEqual = refFilter => filter => (
    Boolean(!refFilter.displayString.localeCompare(filter.displayString)));

const not = f => x => !f(x);

export const addFilter = (arr, filter) =>  {
    const index = arr.findIndex(isEqual(filter));
    
    if (index === -1) return [...arr, ...[filter]];

    return [...arr];
};

export const removeFilter = (arr, filter) => arr.filter(not(isEqual(filter)));
