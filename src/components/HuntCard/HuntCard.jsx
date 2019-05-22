import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Link,
  TextField,
  withStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames";
import { Hunt } from "../../models";

const styles = theme => ({
  card: {
    flex: "0 0 auto",
    margin: theme.spacing(1)
  },
  centerIcon: {
    alignSelf: "stretch"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  partnerFieldsContainer: {
    display: "flex"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  title: {
    fontSize: "0.8rem",
    fontWeight: theme.typography.fontWeightRegular * 1.5,
    lineHeight: "1.2"
  },
  subheader: {
    fontSize: "0.6rem",
    fontWeight: "300"
  }
});

function HuntCard(props) {
  const { classes, className, hunt } = props;

  const [isExpanded, setExpanded] = useState(false);

  return (
    <Card
      className={classNames(classes.card, className)}
      square={false}
      raised={true}
      elevation={1}
    >
      <CardHeader
        classes={{
          action: classes.centerIcon,
          title: classes.title,
          subheader: classes.subheader
        }}
        title={<Link onClick={e => {}}>{hunt.name}</Link>}
        subheader={hunt.starts.toDateString()}
        action={
          <IconButton
            className={classNames(classes.expand, {
              [classes.expandOpen]: isExpanded
            })}
            onClick={() => setExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className={classes.textFieldContainer}>
            <div className={classes.partnerFieldsContainer}>
              <TextField
                className={classes.textField}
                defaultValue={hunt.starts.toLocaleTimeString("en-US")}
                label="Start Time"
                id="start-time-read-only"
                InputProps={{
                  readOnly: true
                }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                defaultValue={hunt.ends.toLocaleTimeString("en-US")}
                label="End Time"
                id="end-time-read-only"
                InputProps={{
                  readOnly: true
                }}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div className={classes.partnerFieldsContainer}>
              <TextField
                className={classes.textField}
                defaultValue={`${hunt.numTeams}/${hunt.maxTeams}`}
                label="Teams"
                id="team-number-read-only"
                InputProps={{
                  readOnly: true
                }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                defaultValue={hunt.items.array.length}
                label="Items"
                id="hunt-item-number-read-only"
                InputProps={{
                  readOnly: true
                }}
                margin="normal"
                variant="outlined"
              />
            </div>
            <TextField
              className={classes.textField}
              defaultValue={hunt.locationName}
              label="Location"
              id="location-read-only"
              InputProps={{
                readOnly: true
              }}
              margin="normal"
              variant="outlined"
            />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

HuntCard.propTypes = {
  classes: PropTypes.object.isRequired,
  hunt: PropTypes.instanceOf(Hunt).isRequired
};

export default withStyles(styles)(HuntCard);
