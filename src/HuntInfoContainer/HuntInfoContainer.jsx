import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HuntInfoCard from '../HuntInfoCard';
import { CardContainer } from '../utils';
import HuntInfoSortMenu from './HuntInfoSortMenu';

function HuntInfoContainer(props) {
    const { hunts } = props;

    const defaultSortFn = () => -1;
    const [ sortFn, setSortFn ] = useState(() => defaultSortFn);

    return (
        <CardContainer 
            title="Hunts"
            sort={
                <HuntInfoSortMenu handleChangeSort={setSortFn} />
            }
        >
            {hunts.sort(sortFn).map(item => (
            <HuntInfoCard key={item.name} huntInfo={item} />
            ))}
        </CardContainer>
    );
};

HuntInfoContainer.propTypes = {
    hunts: PropTypes.array.isRequired
};

export default HuntInfoContainer;