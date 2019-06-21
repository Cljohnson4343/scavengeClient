import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Map from "../Map";
import { GoogleApiWrapper, Marker } from "google-maps-react";
import classNames from "classnames";
import InputField from "../InputField";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(1)
  },
  input: {
    flex: 1
  },
  mapContainer: {
    position: "relative",
    minWidth: "300px",
    minHeight: "300px"
  }
}));

const PlaceAutoComplete = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(props => {
  const {
    className,
    google,
    label,
    loaded,
    locationName,
    latitude,
    longitude,
    onChange,
    ...inputProps
  } = props;
  const classes = useStyles();

  const inputRef = useRef();
  let autocomplete;
  let infowindow;
  if (inputRef.current) {
    autocomplete = new google.maps.places.Autocomplete(inputRef.current);
    autocomplete.setFields(["geometry", "formatted_address"]);
    infowindow = new google.maps.InfoWindow();

    autocomplete.addListener("place_changed", function() {
      infowindow.close();
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        onChange(place.formatted_address);
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        return;
      }

      onChange(
        place.formatted_address,
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
  }

  return (
    <Paper
      className={classNames(classes.root, className)}
      square={true}
      elevation={0}
    >
      <InputField
        label={label}
        id={label}
        inputRef={e => (inputRef.current = e)}
        type="text"
        className={classes.input}
        onChange={e => onChange(e.currentTarget.value, latitude, longitude)}
        placeholder="Address"
        value={locationName}
        inputProps={{ "aria-label": "Address" }}
        {...inputProps}
      />
      {latitude && (
        <div className={classes.mapContainer}>
          <Map
            style={{
              position: "relative",
              height: "100%",
              width: "100%"
            }}
            initialCenter={{
              lat: latitude,
              lng: longitude
            }}
            zoom={10}
          >
            <Marker
              name={"starting ..."}
              title={label}
              position={{
                lat: latitude,
                lng: longitude
              }}
            />
          </Map>
        </div>
      )}
    </Paper>
  );
});

export default PlaceAutoComplete;
