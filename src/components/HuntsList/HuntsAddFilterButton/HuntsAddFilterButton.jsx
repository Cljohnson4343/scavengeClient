import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FilterButton from "../../FilterButton";
import { filtersObj } from "../HuntsFilters/filters";

function HuntsAddFilterButton(props) {
  const { addFilter, ...other } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleFilterMenuClose = e => setAnchorEl(null);

  let filterMenuItems = [];
  for (let key in filtersObj) {
    filterMenuItems.push(
      <MenuItem
        onClick={e => {
          addFilter(filtersObj[key]);
          handleFilterMenuClose(e);
        }}
        key={filtersObj[key].displayString}
      >
        {filtersObj[key].displayString}
      </MenuItem>
    );
  }

  return (
    <div>
      <FilterButton
        aria-owns="filter-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
        {...other}
      >
        <AddIcon fontSize="small" />
      </FilterButton>
      <Menu
        anchorEl={anchorEl}
        id="filter-menu"
        open={Boolean(anchorEl)}
        onClose={handleFilterMenuClose}
      >
        {filterMenuItems}
      </Menu>
    </div>
  );
}

HuntsAddFilterButton.propTypes = {
  addFilter: PropTypes.func.isRequired
};

export default HuntsAddFilterButton;
