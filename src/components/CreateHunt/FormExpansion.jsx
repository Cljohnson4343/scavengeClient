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
  error: {
    color: theme.palette.error.main
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
  const { classes, label, inError, open } = props;

  const [isOpen, setIsOpen] = useState(Boolean(open));

  const colorObj = inError ? classes.error : isOpen ? classes.heading : null;

  return (
    <ExpansionPanel
      classes={{ root: classes.expanded }}
      square={true}
      elevation={0}
      onChange={e => setIsOpen(!isOpen)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon classes={{ root: colorObj }} />}
      >
        <Typography className={colorObj}>{label}</Typography>
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
  inError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles)(FormExpansion);
