import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Map as MapContainer, GoogleApiWrapper } from "google-maps-react";

const styles = theme => ({});

const Map = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(props => {
  const { classes, ...restProps } = props;

  return (
    <MapContainer google={props.google} zoom={14} {...restProps}>
      {props.children}
    </MapContainer>
  );
});

Map.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Map);
