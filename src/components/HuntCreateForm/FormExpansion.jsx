import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  details: {
    padding: `0px ${theme.spacing(2)}px`
  },
  heading: {
    color: theme.palette.primary.main
  },
  panel: {
    backgroundColor: grey[100],
    margin: `${theme.spacing(2)} 0`
  },
  summary: {
    margin: `${theme.spacing(1)} 0`
  }
});

function FormExpansion(props) {
  const { classes } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpansionPanel
      square={true}
      elevation={0}
      className={classes.panel}
      onChange={e => setIsOpen(!isOpen)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography className={isOpen ? classes.heading : null}>
          {props.label}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {props.children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

FormExpansion.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(FormExpansion);
