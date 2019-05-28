import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, IconButton, Paper, withStyles } from "@material-ui/core";
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
import { Items, Item, getItemFromResponse } from "../../models";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";

const styles = theme => ({
  commandCell: {
    padding: `0 ${theme.spacing(1)}px`
  },
  headerCommandCell: {
    textAlign: "center",
    whiteSpace: "nowrap",
    padding: `0 ${theme.spacing(1)}px`
  },
  label: {
    color: theme.palette.primary.main
  },
  paper: {
    marginTop: theme.spacing(2)
  }
});

function ItemTable(props) {
  const { classes, huntID, items, setItems } = props;

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState([]);

  function getRowId(row) {
    return row.itemID;
  }

  function commitChanges({ added, changed, deleted }) {
    if (deleted) {
      deleted.forEach(id => {
        const item = items.getByItemID(id);
        item.apiDeleteItem().then(response => {
          setItems(items.remove(item));
        });
      });
    }

    if (added) {
      added.forEach(input => {
        const item = new Item(input.name, parseInt(input.points), huntID);
        item.apiCreateItem().then(response => {
          setItems(items.add(getItemFromResponse(response.data)));
        });
      });
    }
    console.log("changed");
    console.dir(changed);
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
      title="Sort"
    >
      {children}
      {direction && (
        <SortingIcon classes={{ root: classes.label }} direction={direction} />
      )}
    </Button>
  );

  const GenButton = ({ children, onExecute, ...restProps }) => (
    <IconButton
      className={classes.label}
      size="small"
      onClick={onExecute}
      {...restProps}
    >
      {children}
    </IconButton>
  );

  const AddButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute} title="Add row">
      <AddIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const CancelButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute} title="Cancel changes">
      <CancelIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const CommitButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute} title="Save changes">
      <SaveIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const DeleteButton = ({ onExecute }) => (
    <GenButton
      onExecute={() => {
        if (window.confirm("Are you sure you want to delete this row?")) {
          onExecute();
        }
      }}
      title="Delete row"
    >
      <DeleteIcon classes={{ root: classes.label }} />
    </GenButton>
  );

  const EditButton = ({ onExecute }) => (
    <GenButton onExecute={onExecute} title="Edit row">
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
  function cmdCellComponent({ children }) {
    return <td className={classes.commandCell}>{children}</td>;
  }
  function cmdHeaderComponent({ children }) {
    return <td className={classes.headerCommandCell}>{children}</td>;
  }

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
      name: "points",
      title: "Pts",
      getCellValue: row => row.points
    }
  ];

  const colExtensions = [
    { columnName: "name", align: "left", wordWrapEnabled: true },
    { columnName: "points", align: "right", width: 80 }
  ];

  const sortingExtensions = [
    { columnName: "name", sortingEnabled: true },
    { columnName: "points", sortingEnabled: true }
  ];
  const integratedSortingExtensions = [
    {
      columnName: "points",
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
      <Grid columns={cols} getRowId={getRowId} rows={items.array}>
        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={editingRowIds => {
            console.log("onEditingRowIdsChange");
            console.dir(editingRowIds);
            setEditingRowIds(editingRowIds);
          }}
          rowChanges={rowChanges}
          onRowChanges={rowChanges => {
            console.log("onRowChanges");
            console.dir(rowChanges);
            setRowChanges(rowChanges);
          }}
          addedRows={addedRows}
          onAddedRowsChange={addedRows => {
            setAddedRows(addedRows);
          }}
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
          cellComponent={cmdCellComponent}
          commandComponent={Command}
          headerCellComponent={cmdHeaderComponent}
          showAddCommand={addedRows.length < 1}
          showEditCommand
          showDeleteCommand
          width={80}
        />
      </Grid>
    </Paper>
  );
}

ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  huntID: PropTypes.number.isRequired,
  items: PropTypes.instanceOf(Items).isRequired,
  setItems: PropTypes.func.isRequired
};

export default withStyles(styles)(ItemTable);
