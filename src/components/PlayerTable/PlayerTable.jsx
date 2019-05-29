import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Paper, TextField, withStyles } from "@material-ui/core";
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
import { Player, Players, Teams, getPlayerFromResponse } from "../../models";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import {
  AddButton,
  EditButton,
  CommitButton,
  DeleteButton,
  CancelButton
} from "../ItemTable/CommandButtons";

const styles = theme => ({
  commandCell: {
    paddingLeft: theme.spacing(1)
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

function PlayerTable(props) {
  const { classes, huntID, players, setPlayers, teams } = props;

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [editing, setEditing] = useState({});

  const getRowId = row => row.userID;
  const isEditing = (row, column) => {
    if (editing.row === row && editing.column === column) {
      return true;
    }
    return false;
  };

  function commitChanges({ added, changed, deleted }) {
    if (deleted) {
      deleted.forEach(id => {});
    }

    if (added) {
      added.forEach(input => {});
    }

    if (changed) {
      Object.keys(changed).forEach(id => {});
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
    return <CommandComponent onExecute={onExecute} />;
  };
  function cmdCellComponent({ children }) {
    return <td className={classes.commandCell}>{children}</td>;
  }
  function cmdHeaderComponent({ children }) {
    return <td className={classes.headerCommandCell}>{children}</td>;
  }

  const cols = [
    {
      name: "username",
      title: "Username",
      getCellValue: row => {
        return row.username;
      }
    },
    {
      name: "team",
      title: "Team",
      getCellValue: row => teams.getByID(row.teamID).teamName
    }
  ];

  const colExtensions = [
    { columnName: "username", align: "left", wordWrapEnabled: true },
    { columnName: "team", align: "center", width: 80 }
  ];

  const sortingExtensions = [
    { columnName: "username", sortingEnabled: true },
    { columnName: "team", sortingEnabled: true }
  ];
  const editingExtensions = [
    {
      columnName: "username",
      editingEnabled: true
    }
  ];

  function UsernameEditor({ row, value, onValueChange }) {
    const input = value ? value : row.username;
    return (
      <TextField
        autoFocus={isEditing(getRowId(row), "username")}
        id="username-editor"
        margin="normal"
        onChange={e => {
          setEditing({ row: getRowId(row), column: "username" });
          onValueChange(e.currentTarget.value);
        }}
        type="text"
        value={input}
        variant="standard"
      />
    );
  }
  function UsernameTypeProvider(props) {
    return <DataTypeProvider editorComponent={UsernameEditor} {...props} />;
  }

  return (
    <Paper className={classes.paper}>
      <Grid columns={cols} getRowId={getRowId} rows={players.array}>
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
        <IntegratedSorting />
        <UsernameTypeProvider for={["username"]} />
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

PlayerTable.propTypes = {
  classes: PropTypes.object.isRequired,
  huntID: PropTypes.number.isRequired,
  players: PropTypes.instanceOf(Players).isRequired,
  setPlayers: PropTypes.func.isRequired,
  teams: PropTypes.instanceOf(Teams).isRequired
};

export default withStyles(styles)(PlayerTable);
