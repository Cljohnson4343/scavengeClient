import React from "react";
import PropTypes from "prop-types";
import SortMenu from "../SortMenu";

const compareByPointsLowToHigh = function(a, b) {
  return a.points - b.points;
};
const compareByPointsHighToLow = function(a, b) {
  return b.points - a.points;
};

const compareByAlphabet = function(a, b) {
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
};

const sortFilters = {
  unsorted: {
    displayString: "",
    sortFunction: () => -1
  },
  alphabetical: {
    displayString: "Alphabetical",
    sortFunction: compareByAlphabet
  },
  pointsLowToHigh: {
    displayString: "Points: Low to High",
    sortFunction: compareByPointsLowToHigh
  },
  pointsHighToLow: {
    displayString: "Points: High to Low",
    sortFunction: compareByPointsHighToLow
  }
};

function TeamsSortMenu(props) {
  return <SortMenu sortFilters={sortFilters} {...props} />;
}

TeamsSortMenu.propTypes = {
  handleChangeSort: PropTypes.func.isRequired
};

export default TeamsSortMenu;
