import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Card, CardHeader } from "@material-ui/core";
import { Team } from "../../models";

const styles = theme => ({
  pts: {
    alignSelf: "center"
  }
});

function TeamResultsCard(props) {
  const { classes, replaceTeam, team } = props;

  useEffect(() => {
    team.apiRetrievePoints().then(res => {
      let t = team.copy();
      t.data.points = res.data.points;

      console.log("recieved response");
      replaceTeam(t);
    });
  }, []);

  return (
    <Card square={true}>
      <CardHeader
        classes={{
          action: classes.pts,
          title: classes.title
        }}
        title={team.teamName}
        action={
          <span className={classes.pts}>{`${
            team.points ? team.points : 0
          } pts`}</span>
        }
      />
    </Card>
  );
}

TeamResultsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  replaceTeam: PropTypes.func.isRequired,
  team: PropTypes.instanceOf(Team).isRequired
};

export default withStyles(styles)(TeamResultsCard);
