import React from "react";
import PropTypes from "prop-types";
import SortMenu from "../../SortMenu";

const compareByNumItemsLowToHigh = (a, b) => a.items.length - b.items.length;
const compareByNumItemsHighToLow = (a, b) => b.items.length - a.items.length;

const compareByOpen = function(a, b) {
  if (a.isOpen && !b.isOpen) return -1;
  if (!a.isOpen && b.isOpen) return 1;
  return 0;
};
const compareByClosed = function(a, b) {
  if (a.isOpen && !b.isOpen) return 1;
  if (!a.isOpen && b.isOpen) return -1;
  return 0;
};

const compareByAlphabet = function(a, b) {
  if (a.name > b.name) return 1;
  if (b.name > a.name) return -1;
  return 0;
};

const compareByStartTime = (a, b) =>
  b.startTime.getTime() - a.startTime.getTime();

const sortFilters = {
  unsorted: {
    displayString: "",
    sortFunction: () => -1
  },
  itemsLowToHigh: {
    displayString: "Items: Low to High",
    sortFunction: compareByNumItemsLowToHigh
  },
  itemsHighToLow: {
    displayString: "Items: High to Low",
    sortFunction: compareByNumItemsHighToLow
  },
  open: {
    displayString: "Open",
    sortFunction: compareByOpen
  },
  closed: {
    displayString: "Closed",
    sortFunction: compareByClosed
  },
  alphabetical: {
    displayString: "Alphabetical",
    sortFunction: compareByAlphabet
  },
  startTime: {
    displayString: "Start Time",
    sortFunction: compareByStartTime
  }
};

function HuntInfoSortMenu(props) {
  return <SortMenu sortFilters={sortFilters} {...props} />;
}

HuntInfoSortMenu.propTypes = {
  handleChangeSort: PropTypes.func.isRequired
};

export default HuntInfoSortMenu;
