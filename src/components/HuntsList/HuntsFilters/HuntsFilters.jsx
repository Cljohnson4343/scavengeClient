import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntInfoAddFiltersButton from "../HuntsAddFilterButton";
import FilterButton from "../../FilterButton";
import FilterButtonText from "../../FilterButtonText";
import { addFilter, removeFilter } from "./utils";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  item: {
    marginRight: "2px"
  }
};

function HuntsFilters(props) {
  const { classes, filters, setFilters } = props;

  return (
    <div className={classes.root}>
      {filters.map(filter => (
        <FilterButton
          classes={{ root: classes.item }}
          key={filter.displayString}
          onClick={e => setFilters(removeFilter(filters, filter))}
        >
          <FilterButtonText>{filter.displayString}</FilterButtonText>
        </FilterButton>
      ))}
      <HuntInfoAddFiltersButton
        addFilter={filter => setFilters(addFilter(filters, filter))}
        classes={{ root: classes.item }}
      />
    </div>
  );
}

HuntsFilters.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default withStyles(styles)(HuntsFilters);
