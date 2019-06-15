import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Map as MapContainer, GoogleApiWrapper } from "google-maps-react";
import { styles as mapStyles } from "./styles";

const styles = theme => ({});

const Map = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(props => {
  const { classes, ...restProps } = props;

  return (
    <MapContainer
      google={props.google}
      zoom={14}
      {...restProps}
      styles={mapStyles}
      streetViewControl={false}
      scaleControl={false}
      mapTypeControl={false}
      zoomControl={false}
    >
      {props.children}
    </MapContainer>
  );
});

Map.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Map);
