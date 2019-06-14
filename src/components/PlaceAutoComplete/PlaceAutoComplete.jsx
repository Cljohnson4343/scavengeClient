import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Map from "../Map";
import { GoogleApiWrapper, Marker } from "google-maps-react";
import classNames from "classnames";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    width: "100%"
  },
  root: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(1),
    width: "100%"
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: theme.spacing(1)
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
      <div className={classes.container}>
        <TextField
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
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon />
        </IconButton>
      </div>
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
