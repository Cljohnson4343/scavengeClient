import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { grey } from "@material-ui/core/colors";

const styles = theme => ({
  details: {
    padding: `0px ${theme.spacing(2)}px`
  },
  expanded: {
    backgroundColor: grey[100],
    marginTop: theme.spacing(1)
  },
  heading: {
    color: theme.palette.primary.main
  }
});

function FormExpansion(props) {
  const { classes } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpansionPanel
      classes={{ root: classes.expanded }}
      square={true}
      elevation={0}
      onChange={e => setIsOpen(!isOpen)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
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
