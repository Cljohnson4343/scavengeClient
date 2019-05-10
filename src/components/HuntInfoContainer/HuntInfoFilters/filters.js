import * as hunt from "../../../hunt";
import * as loc from "../../../utils/loc";

// within produces a function that needs to be partially applied with the user's location in
// order to work as a filter function. This can be done by bind(null, location) before
// the filter function is to be used
export const within = d => (location, x) => {
  if (loc.distance(loc.point(hunt.location(x)), loc.point(location)) > d)
    return false;

  return x;
};

export const filterWrapper = f => x => {
  if (Boolean(x) === false) return false;

  return f(x);
};

export const teamsGreaterThan = n => x => {
  if (hunt.maxTeams(x) > n) return x;

  return false;
};

export const itemsGreaterThan = n => x => {
  if (hunt.items(x).length > n) return x;

  return false;
};

export const needsBinding = x => x.displayString.includes("Within");

const not = f => x => !f(x);

export const filtersObj = {
  within10Miles: {
    displayString: "Within 10 mi",
    filterFunction: within(10)
  },
  within20Miles: {
    displayString: "Within 20 mi",
    filterFunction: within(20)
  },
  within50Miles: {
    displayString: "Within 50 mi",
    filterFunction: within(50)
  },
  open: {
    displayString: "Open",
    filterFunction: hunt.isOpen
  },
  closed: {
    displayString: "Closed",
    filterFunction: not(hunt.isOpen)
  },
  moreThan2Teams: {
    displayString: "More than 2 teams",
    filterFunction: teamsGreaterThan(2)
  },
  moreThan10Items: {
    displayString: "More than 10 items",
    filterFunction: itemsGreaterThan(10)
  }
};
