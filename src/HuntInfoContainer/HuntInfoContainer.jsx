import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import HuntInfoCard from '../HuntInfoCard';
import { CardContainer } from '../utils';
import HuntInfoSortMenu from './HuntInfoSortMenu';
import HuntInfoFilters from './HuntInfoFilters';
import { LocationContext } from '../Location';
import * as utils from './HuntInfoFilters';
import { compose } from '../utils';

function HuntInfoContainer(props) {
    const { hunts } = props;

    const defaultSortFn = () => -1;
    const [ sortFn, setSortFn ] = useState(() => defaultSortFn);
    const location = useContext(LocationContext);

    const [ filters, setFilters ] = useState([]);
    // make sure all of the filter functions are wrapped and the ones that
    // need to be bound with a location are bound
    const arrayOfFilterFns = filters.map(filterObj => {
        if (utils.needsBinding(filterObj)) {
            return utils.filterWrapper(filterObj.filterFunction.bind(null, location));
        };

        return utils.filterWrapper(filterObj.filterFunction);
    });
    // compose all filter functions
    const filterFn = compose(...arrayOfFilterFns);

    return (
        <CardContainer 
            title="Hunts"
            sort={
                <HuntInfoSortMenu handleChangeSort={setSortFn} />
            }
            filters={
                <HuntInfoFilters filters={filters} setFilters={setFilters} />
            }
        >
            {hunts.filter(filterFn).sort(sortFn).map(item => (
                <HuntInfoCard key={item.name} huntInfo={item} />
            ))}
        </CardContainer>
    );
};

HuntInfoContainer.propTypes = {
    hunts: PropTypes.array.isRequired
};

export default HuntInfoContainer;