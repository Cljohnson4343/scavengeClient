import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import HuntCard from "../HuntCard";
import Cards from "../Cards";
import HuntsSortMenu from "./HuntsSortMenu";
import HuntsFilters from "./HuntsFilters";
import LocationContext from "../Location";
import * as utils from "./HuntsFilters";
import { compose } from "../../utils";

function Hunts(props) {
  const { hunts } = props;

  const defaultSortFn = () => -1;
  const [sortFn, setSortFn] = useState(() => defaultSortFn);
  const location = useContext(LocationContext);

  const [filters, setFilters] = useState([]);
  // make sure all of the filter functions are wrapped and the ones that
  // need to be bound with a location are bound
  const arrayOfFilterFns = filters.map(filterObj => {
    if (utils.needsBinding(filterObj)) {
      return utils.filterWrapper(filterObj.filterFunction.bind(null, location));
    }

    return utils.filterWrapper(filterObj.filterFunction);
  });
  // compose all filter functions
  const filterFn = compose(...arrayOfFilterFns);

  return (
    <Cards
      title="Hunts"
      sort={<HuntsSortMenu handleChangeSort={setSortFn} />}
      filters={<HuntsFilters filters={filters} setFilters={setFilters} />}
    >
      {hunts
        .filter(filterFn)
        .sort(sortFn)
        .map(item => (
          <HuntCard key={item.name} huntInfo={item} />
        ))}
    </Cards>
  );
}

Hunts.propTypes = {
  hunts: PropTypes.array.isRequired
};

export default Hunts;
