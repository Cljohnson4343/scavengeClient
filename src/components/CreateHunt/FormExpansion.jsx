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
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  container: {
    marginBottom: "0px"
  },
  details: {
    padding: `0px ${theme.spacing(2)}px`
  },
  divider: {
    color: theme.palette.primary.main
  },
  error: {
    color: theme.palette.error.main
  },
  heading: {
    color: theme.palette.primary.main
  },
  icon: {
    marginLeft: theme.spacing(1)
  }
});

function FormExpansion(props) {
  const { classes, label, inError, open } = props;

  const [isOpen, setIsOpen] = useState(Boolean(open));

  const colorObj = inError ? classes.error : isOpen ? classes.heading : null;
  const editIconColor = inError ? classes.error : classes.heading;

  return (
    <div className={classes.container}>
      <ExpansionPanel
        square={false}
        elevation={0}
        expanded={open}
        onChange={e => setIsOpen(!isOpen)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon classes={{ root: colorObj }} />}
        >
          <Typography className={colorObj}>
            {
              <span>
                {label}
                {!isOpen && (
                  <EditIcon
                    className={classes.icon}
                    classes={{ root: editIconColor }}
                    fontSize="small"
                  />
                )}
              </span>
            }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

FormExpansion.propTypes = {
  classes: PropTypes.object.isRequired,
  inError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles)(FormExpansion);
