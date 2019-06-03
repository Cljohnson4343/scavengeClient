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
import { Team, Teams } from "../../models";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GroupIcon from "@material-ui/icons/Group";
import { validateTeamName } from "../../utils";
import {
  GroupAddButton,
  EditButton,
  CommitButton,
  DeleteButton,
  CancelButton
} from "../CommandButtons";
import SectionHeader from "../SectionHeader";

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
  const { classes, huntID, teams, setTeams } = props;

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [editing, setEditing] = useState({});

  const getRowId = row => (row ? row.teamID : 0);
  const isEditing = rowID => {
    if (editing.rowID === rowID) {
      return true;
    }
    return false;
  };

  function commitChanges({ added, changed, deleted }) {
    if (deleted) {
      deleted.forEach(id => {
        const team = teams.getByItemID(id);
        team.apiDeleteTeam().then(response => {
          setTeams(teams.remove(team));
        });
      });
    }

    if (added) {
      added.forEach(input => {
        const item = new Team({ teamName: input.teamName, huntID: huntID });
        item.apiCreateTeam().then(response => {
          setTeams(teams.add(new Team(response.data)));
        });
      });
    }

    if (changed) {
      Object.keys(changed).forEach(id => {
        let team = teams.getByItemID(parseInt(id));
        team = new Team({ ...team.requestJSON, ...changed[id] });
        team.apiUpdateTeam().then(response => {
          setTeams(teams.replace(parseInt(id), team));
        });
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
    add: GroupAddButton,
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
      name: "teamName",
      title: "Name",
      getCellValue: row => {
        return row.teamName;
      }
    }
  ];

  const colExtensions = [
    { columnName: "teamName", align: "left", wordWrapEnabled: true }
  ];

  const sortingExtensions = [{ columnName: "teamName", sortingEnabled: true }];
  const editingExtensions = [
    {
      columnName: "teamName",
      editingEnabled: true
    }
  ];

  function NameEditor({ row, value, onValueChange }) {
    const input = value ? value : row.teamName;
    const err = validateTeamName(input);
    return (
      <TextField
        autoFocus={isEditing(getRowId(row), "teamName")}
        error={err.inError ? true : null}
        FormHelperTextProps={err.inError ? { error: true } : null}
        helperText={err.msg}
        id="name-editor"
        margin="normal"
        onChange={e => {
          if (!isEditing(getRowId(row), "teamName")) {
            setEditing({ rowID: getRowId(row), column: "teamName" });
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

  const NoDataCell = ({ getMessage }) => {
    return (
      <td className={classes.noDataCell} colSpan={cols.length + 1}>
        <Typography className={classes.noDataMsg}>No teams</Typography>
      </td>
    );
  };

  return (
    <div>
      <SectionHeader Icon={GroupIcon}>Teams</SectionHeader>
      <Paper className={classes.paper}>
        <Grid columns={cols} getRowId={getRowId} rows={teams.array}>
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
          <NameTypeProvider for={["teamName"]} />
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
    </div>
  );
}

ItemTable.propTypes = {
  classes: PropTypes.object.isRequired,
  huntID: PropTypes.number.isRequired,
  teams: PropTypes.instanceOf(Teams).isRequired,
  setTeams: PropTypes.func.isRequired
};

export default withStyles(styles)(ItemTable);
