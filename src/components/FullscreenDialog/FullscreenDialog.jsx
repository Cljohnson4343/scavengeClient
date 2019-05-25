import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  bar: {
    backgroundColor: theme.palette.primary.main,
    height: theme.barHeight
  },
  icon: {
    color: theme.palette.primary.contrastText
  },
  title: {
    color: theme.palette.primary.contrastText
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullscreenDialog(props) {
  const { classes, label, setClosed } = props;

  return (
    <Dialog
      fullScreen={true}
      fullWidth={true}
      key="notification-dialog"
      open={true}
      TransitionComponent={Transition}
    >
      <Toolbar className={classes.bar}>
        <IconButton
          aria-label="Close"
          color="primary"
          edge="start"
          onClick={setClosed}
        >
          <CloseIcon classes={{ root: classes.icon }} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {label}
        </Typography>
      </Toolbar>
      {props.children}
    </Dialog>
  );
}

FullscreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  setClosed: PropTypes.func.isRequired
};

export default withStyles(styles)(FullscreenDialog);
