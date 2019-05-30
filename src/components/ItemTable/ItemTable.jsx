import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Paper,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import {
  SortingState,
  IntegratedSorting,
  EditingState,
  DataTypeProvider
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableEditRow,
  TableHeaderRow,
  TableEditColumn
} from "@devexpress/dx-react-grid-material-ui";
import { Items, Item, getItemFromResponse } from "../../models";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import { validateItemName, validateItemPoints } from "../../utils";
import {
  AddButton,
  EditButton,
  CommitButton,
  DeleteButton,
  CancelButton
} from "./CommandButtons";

const styles = theme => ({
  commandCell: {
    paddingLeft: theme.spacing(1)
  },
  error: {
    color: theme.palette.error.main
  },
  headerCommandCell: {
    textAlign: "center",
    whiteSpace: "nowrap",
    padding: `0 ${theme.spacing(1)}px`
  },
  label: {
    color: theme.palette.primary.main
  },
  noDataCell: {
    textAlign: "center"
  },
  noDataMsg: {
    margin: `${theme.spacing(4)}px 0`
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
  const [sorting, setSorting] = useState([]);
  const [editing, setEditing] = useState({});

  const getRowId = row => (row ? row.itemID : 0);
  const isEditing = (rowID, column) => {
    if (editing.rowID === rowID && editing.column === column) {
      return true;
    }
    return false;
  };

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

    if (changed) {
      Object.keys(changed).forEach(id => {
        let item = items.getByItemID(parseInt(id));
        if (changed[id]) {
          if (changed[id].name) {
            item = item.changeName(changed[id].name);
          }
          if (changed[id].points) {
            item = item.changePoints(changed[id].points);
          }

          item.apiUpdateItem().then(response => {
            setItems(items.replace(parseInt(id), item));
          });
        }
      });
    }
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

  const cmds = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton
  };
  const Command = ({ id, onExecute }) => {
    const CommandComponent = cmds[id];
    return (
      <CommandComponent
        classes={id === "cancel" ? { label: classes.error } : null}
        onExecute={onExecute}
      />
    );
  };
  function cmdCellComponent({ children }) {
    return <td className={classes.commandCell}>{children}</td>;
  }
  function cmdHeaderComponent({ children }) {
    return <td className={classes.headerCommandCell}>{children}</td>;
  }

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
    { columnName: "points", align: "center", width: 70 }
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
  const editingExtensions = [
    {
      columnName: "name",
      editingEnabled: true
    }
  ];

  function NameEditor({ row, value, onValueChange }) {
    const input = value ? value : row.name;
    const err = validateItemName(input);
    return (
      <TextField
        autoFocus={isEditing(getRowId(row), "name")}
        error={err.inError ? true : null}
        FormHelperTextProps={err.inError ? { error: true } : null}
        helperText={err.msg}
        id="name-editor"
        margin="normal"
        onChange={e => {
          if (!isEditing(getRowId(row), "name")) {
            setEditing({ rowID: getRowId(row), column: "name" });
          }
          onValueChange(e.currentTarget.value);
        }}
        type="text"
        value={input}
        variant="standard"
      />
    );
  }
  function NameTypeProvider(props) {
    return <DataTypeProvider editorComponent={NameEditor} {...props} />;
  }

  function PointsEditor({ row, value, onValueChange }) {
    const input = typeof value === "number" ? value : row.points;
    const err = validateItemPoints(input);
    return (
      <TextField
        autoFocus={isEditing(getRowId(row), "points")}
        error={err.inError ? true : null}
        FormHelperTextProps={err.inError ? { error: true } : null}
        helperText={err.msg}
        id="points-editor"
        margin="normal"
        onChange={e => {
          if (!isEditing(getRowId(row), "points")) {
            setEditing({ rowID: getRowId(row), column: "points" });
          }
          let value = parseInt(e.currentTarget.value);
          value = isNaN(value) ? 0 : value;
          onValueChange(value);
        }}
        type="number"
        value={input}
        variant="standard"
      />
    );
  }
  function PointsTypeProvider(props) {
    return <DataTypeProvider editorComponent={PointsEditor} {...props} />;
  }
  const NoDataCell = ({ getMessage }) => {
    return (
      <td className={classes.noDataCell} colspan={cols.length + 1}>
        <Typography className={classes.noDataMsg}>No items</Typography>
      </td>
    );
  };

  return (
    <Paper className={classes.paper}>
      <Grid columns={cols} getRowId={getRowId} rows={items.array}>
        <EditingState
          columnExtensions={editingExtensions}
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={editingRowIds => {
            setEditingRowIds(editingRowIds);
          }}
          rowChanges={rowChanges}
          onRowChangesChange={rowChanges => {
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
        <NameTypeProvider for={["name"]} />
        <PointsTypeProvider for={["points"]} />
        <Table
          columnExtensions={colExtensions}
          noDataCellComponent={NoDataCell}
        />
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
