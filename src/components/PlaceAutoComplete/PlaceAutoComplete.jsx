import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    marginLeft: theme.spacing(1),
    alignItems: "center",
    width: "100%"
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: theme.spacing(1)
  }
}));

export default function PlaceAutoComplete(props) {
  const { label, ...inputProps } = props;
  const classes = useStyles();
  const { google } = window;

  const [input, setInput] = useState("");
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
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        return;
      }

      setInput(place.formatted_address);
    });
  }

  return (
    <Paper className={classes.root} square={true} elevation={0}>
      <TextField
        label={label}
        id={label}
        inputRef={e => (inputRef.current = e)}
        type="text"
        className={classes.input}
        onChange={e => setInput(e.currentTarget.value)}
        placeholder="Address"
        value={input}
        inputProps={{ "aria-label": "Address" }}
        {...inputProps}
      />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
