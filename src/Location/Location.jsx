import React, { useState, useEffect } from 'react';

const testPosition = {
    coords: {
        latitude: 34.7108,
        longitude: -86.7425,
    },
};

export const LocationContext = React.createContext(testPosition);

function Location(props) {

    const gpsIsAvailable = "geolocation" in navigator;

    const [ location, setLocation ] = useState(testPosition);

    const gpsOptions = {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: Infinity,
    };

    useEffect(() => {
        const id = navigator.geolocation.watchPosition(pos => { 
            setLocation(pos);
        },(posErr) => {alert(posErr.message)}, gpsOptions);
        
        return () => navigator.geolocation.clearWatch(id);
    }, []);

    return (
        <LocationContext.Provider value={location}>
            {props.children}
        </LocationContext.Provider>
    );
};

export default Location;