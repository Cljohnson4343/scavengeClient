import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Paper, withStyles } from "@material-ui/core";
import {
  SortingState,
  IntegratedSorting,
  EditingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableEditRow,
  TableHeaderRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import { Items } from "../../models";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

const styles = theme => ({
  label: {
    color: theme.palette.primary.main
  },
  paper: {
    marginTop: theme.spacing(2)
  }
});

function ItemTable(props) {
  const { classes, items } = props;

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState([]);

  function commitChanges({ added, changed, deleted }) {
    console.log("added");
    console.dir(added);
    console.log("changed");
    console.dir(changed);
    console.log("deleted");
    console.dir(deleted);
  }

  function SortingIcon({ direction }) {
    return direction === "asc" ? (
      <ArrowUpward style={{ fontSize: "18px" }} />
    ) : (
      <ArrowDownward style={{ fontSize: "18px" }} />
    );
  }

  const SortLabel = ({ onSort, children, direction }) => (
    <Button
      className={classes.label}
      size="small"
      variant="outlined"
      onClick={onSort}
    >
      {children}
      {direction && (
        <SortingIcon classes={{ root: classes.label }} direction={direction} />
      )}
    </Button>
  );

  const GenButton = ({ children, onExecute }) => (
    <Button
      className={classes.label}
      size="small"
      variant="outlined"
      onClick={onExecute}
    >
      {children}
    </Button>
  );

  const AddButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute}>
      <AddIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const CancelButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute}>
      <CancelIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const CommitButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute}>
      <SaveIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const DeleteButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute}>
      <DeleteIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const EditButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute}>
      <EditIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const cmds = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton
  };
  const Command = ({ id, onExecute }) => {
    const CommandComponent = cmds[id];
    return <CommandComponent onExecute={onExecute} />;
  };

  const [sorting, setSorting] = useState([
    {
      columnName: "name",
      direction: "asc"
    }
  ]);

  const cols = [
    {
      name: "name",
      title: "Name",
      getCellValue: row => {
        return row.name;
      }
    },
    {
      name: "pts",
      title: "Pts",
      getCellValue: row => row.points
    }
  ];

  const colExtensions = [
    { columnName: "name", align: "left", wordWrapEnabled: true },
    { columnName: "pts", align: "right", width: 80 }
  ];

  const sortingExtensions = [
    { columnName: "name", sortingEnabled: true },
    { columnName: "pts", sortingEnabled: true }
  ];
  const integratedSortingExtensions = [
    {
      columnName: "pts",
      compare: (a, b) => {
        if (a === b) {
          return 0;
        }
        return a < b ? -1 : 1;
      }
    }
  ];

  return (
    <Paper className={classes.paper}>
      <Grid columns={cols} rows={items.array}>
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={editingRowIds =>
            setEditingRowIds(editingRowIds)
          }
          rowChanges={rowChanges}
          onRowChanges={rowChanges => setRowChanges(rowChanges)}
          addedRows={addedRows}
          onAddedRowsChange={addedRows => setAddedRows(addedRows)}
          onCommitChanges={commitChanges}
        />
        <SortingState
          columnExtensions={sortingExtensions}
          onSortingChange={sortingArr => setSorting(sortingArr)}
          sorting={sorting}
        />
        <IntegratedSorting columnExtensions={integratedSortingExtensions} />
        <Table columnExtensions={colExtensions} />
        <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
        <TableEditRow />
        <TableEditColumn
          commandComponent={Command}
          showAddCommand
          showEditCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  );
}

ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(Items).isRequired
};

export default withStyles(styles)(ItemTable);
