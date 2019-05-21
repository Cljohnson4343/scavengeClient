import React, { useState } from "react";
import PropTypes from "prop-types";
import ItemCard from "../ItemCard";
import HuntItemsSortMenu from "./HuntItemsSortMenu";
import Cards from "../Cards";

function HuntItemContainer(props) {
  const { huntItems } = props;

  // use dummy initial sort function to preserve initial order
  const defaultSort = (a, b) => -1;
  const [sortFunction, setSortFunction] = useState(() => defaultSort);

  return (
    <Cards
      title="Hunt Items"
      sort={<HuntItemsSortMenu handleChangeSort={setSortFunction} />}
    >
      {huntItems.sort(sortFunction).map(item => (
        <ItemCard key={item.name} huntInfo={item} />
      ))}
    </Cards>
  );
}

HuntItemContainer.propTypes = {
  huntItems: PropTypes.array.isRequired
};

export default HuntItemContainer;
