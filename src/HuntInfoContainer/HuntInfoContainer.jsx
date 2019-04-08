import React from 'react';
import PropTypes from 'prop-types';
import HuntInfoCard from '../HuntInfoCard';
import { CardContainer } from '../utils';

function HuntInfoContainer(props) {
    const { hunts } = props;

    return (
        <CardContainer title="Hunts">
            {hunts.map(item => (
            <HuntInfoCard key={item.name} huntInfo={item} />
            ))}
        </CardContainer>
    );
};

HuntInfoContainer.propTypes = {
    hunts: PropTypes.array.isRequired
};

export default HuntInfoContainer;