import React, { useState, useEffect } from "react";
import { Location as LocationModel } from "../../models";

export const LocationContext = React.createContext(null);

function Location(props) {
  const gpsIsAvailable = "geolocation" in navigator;

  const [location, setLocation] = useState(null);

  const gpsOptions = {
    enableHighAccuracy: false
  };

  useEffect(() => {
    if (gpsIsAvailable) {
      const id = navigator.geolocation.watchPosition(
        pos => {
          let loc = new LocationModel({
            timestamp: pos.timestamp,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
          setLocation(loc);
        },
        posErr => {
          alert(posErr.message);
        },
        gpsOptions
      );

      return () => navigator.geolocation.clearWatch(id);
    }
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {props.children}
    </LocationContext.Provider>
  );
}

export default Location;
