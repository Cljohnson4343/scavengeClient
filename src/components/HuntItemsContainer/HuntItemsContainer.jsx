import React, { useState } from "react";
import PropTypes from "prop-types";
import HuntItemCard from "../HuntItemCard";
import HuntItemsSortMenu from "./HuntItemsSortMenu";
import CardContainer from "../CardContainer";

function HuntItemContainer(props) {
  const { huntItems } = props;

  // use dummy initial sort function to preserve initial order
  const defaultSort = (a, b) => -1;
  const [sortFunction, setSortFunction] = useState(() => defaultSort);

  return (
    <CardContainer
      title="Hunt Items"
      sort={<HuntItemsSortMenu handleChangeSort={setSortFunction} />}
    >
      {huntItems.sort(sortFunction).map(item => (
        <HuntItemCard key={item.name} huntInfo={item} />
      ))}
    </CardContainer>
  );
}

HuntItemContainer.propTypes = {
  huntItems: PropTypes.array.isRequired
};

export default HuntItemContainer;
