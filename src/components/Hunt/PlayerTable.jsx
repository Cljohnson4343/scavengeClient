import React from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import { IntegratedGrouping, GroupingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableGroupRow,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";

const styles = theme => ({});

function PlayerTable(props) {
  const cols = [
    { name: "email", title: "Email" },
    { name: "team", title: "Team" },
    { name: "edit", title: "Edit" }
  ];

  const rows = [
    { email: "ck@smallville.com", edit: "add", team: "crows" },
    { email: "cj@gmail.com", edit: "delete", team: "crows" }
  ];

  const colExtensions = [
    { columnName: "team", width: 120 },
    { columnName: "email", align: "left" },
    { columnName: "edit", align: "right", width: 60 }
  ];

  return (
    <Paper>
      <Grid columns={cols} rows={rows}>
        <GroupingState grouping={[{ columnName: "team" }]} />
        <IntegratedGrouping />

        <Table columnExtensions={colExtensions} />
        <TableHeaderRow />
        <TableGroupRow />
      </Grid>
    </Paper>
  );
}

PlayerTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PlayerTable);
