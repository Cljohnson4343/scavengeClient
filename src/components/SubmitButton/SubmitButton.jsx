import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    alignSelf: "flex-end"
  }
});

function SubmitButton(props) {
  const { classes, handleSubmit, ...restProps } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      size="small"
      onClick={e => handleSubmit(e)}
      {...restProps}
    >
      <SendIcon className={classes.rightIcon} />
    </Button>
  );
}

SubmitButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubmitButton);
