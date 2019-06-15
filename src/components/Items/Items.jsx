import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemCard from "../ItemCard";
import ItemsSortMenu from "./ItemsSortMenu";
import Cards from "../Cards";
import { Items as ItemsModel } from "../../models";

const styles = theme => ({
  itemsContainer: {
    marginTop: theme.spacing(0)
  },
  sortFont: {
    color: theme.palette.primary.main,
    fontSize: "0.9em",
    fontWeight: theme.typography.fontWeightRegular
  }
});

function HuntItemContainer(props) {
  const { classes, items } = props;

  const defaultSort = (a, b) => -1;
  const [sortFunction, setSortFunction] = useState(() => defaultSort);

  return (
    <Cards
      classes={{ itemsContainer: classes.itemsContainer }}
      title="Hunt Items"
      sort={
        <ItemsSortMenu
          classes={{ sortMenuFont: classes.sortFont }}
          handleChangeSort={setSortFunction}
        />
      }
      withDivider={false}
    >
      {items.array.sort(sortFunction).map(item => (
        <ItemCard key={item.name} item={item} />
      ))}
    </Cards>
  );
}

HuntItemContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(ItemsModel).isRequired
};

export default withStyles(styles)(HuntItemContainer);
