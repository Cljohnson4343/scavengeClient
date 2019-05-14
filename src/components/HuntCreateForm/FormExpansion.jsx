import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
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
  divider: {
    color: theme.palette.primary.main
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
      <ExpansionPanelSummary
        expandIcon={
          <ExpandMoreIcon classes={isOpen ? { root: classes.heading } : null} />
        }
      >
        <Typography className={isOpen ? classes.heading : null}>
          {props.label}
        </Typography>
      </ExpansionPanelSummary>
      {isOpen && <Divider className={classes.divider} variant="middle" />}
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
