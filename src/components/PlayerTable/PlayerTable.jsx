import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  MenuItem,
  Paper,
  Select,
  TableCell,
  TextField,
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
import { Players, Teams } from "../../models";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import GroupIcon from "@material-ui/icons/Group";
import {
  EditButton,
  CommitButton,
  DeleteButton,
  CancelButton
} from "../ItemTable/CommandButtons";
import SectionHeader from "../SectionHeader";
import InviteTable from "./InviteTable";

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
  paper: {
    marginTop: theme.spacing(2)
  }
});

function PlayerTable(props) {
  const { classes, huntID, players, setPlayers, teams } = props;

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState([]);
  const [sorting, setSorting] = useState([]);

  const getRowId = row => (row ? row.userID : 0);

  function commitChanges({ changed, deleted }) {
    if (deleted) {
      deleted.forEach(id => {
        let player = players.getByID(id);
        player.apiDeletePlayer().then(response => {
          setPlayers(players.remove(player));
        });
      });
    }

    if (changed) {
      Object.keys(changed).forEach(id => {
        let teamID = getTeamID(changed[id].team);
        let player = players.getByID(parseInt(id));
        if (player.teamID === teamID) {
          return;
        }

        player = player.changeTeam(teamID);
        player.apiCreatePlayer().then(response => {
          setPlayers(players.changePlayersTeam(player, teamID));
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
      name: "username",
      title: "Username",
      getCellValue: row => {
        return row.username;
      }
    },
    {
      name: "team",
      title: "Team",
      getCellValue: row => getTeam(row)
    }
  ];

  const colExtensions = [
    { columnName: "username", align: "left", wordWrapEnabled: true },
    { columnName: "team", align: "left", width: 120 }
  ];

  const sortingExtensions = [
    { columnName: "username", sortingEnabled: true },
    { columnName: "team", sortingEnabled: true }
  ];
  const editingExtensions = [
    {
      columnName: "username",
      editingEnabled: false
    }
  ];

  function UsernameEditor({ row }) {
    return (
      <TextField
        disabled={true}
        id="username-editor"
        margin="normal"
        type="text"
        value={row.username}
        variant="standard"
      />
    );
  }
  function UsernameTypeProvider(props) {
    return <DataTypeProvider editorComponent={UsernameEditor} {...props} />;
  }

  const getTeamID = name => {
    let team = teams.getByName(name);
    return team ? team.teamID : 0;
  };
  const getTeam = row => {
    const newTeamName = rowChanges[getRowId(row)]
      ? rowChanges[getRowId(row)].team
      : null;
    if (newTeamName) {
      return newTeamName;
    }
    const team = teams.getByID(row.teamID);
    return team ? team.teamName : "unassigned";
  };
  const availableValues = {
    team: ["unassigned", ...teams.array.map(t => t.teamName)]
  };
  const LookupEditCellBase = ({
    availableColumnValues,
    onValueChange,
    classes,
    row
  }) => {
    return (
      <TableCell className={classes.lookupEditCell}>
        <Select
          value={getTeam(row)}
          onChange={event => {
            onValueChange(event.target.value);
          }}
          input={<Input classes={{ root: classes.inputRoot }} />}
        >
          {availableColumnValues.map(item => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    );
  };
  const LookupEditCell = withStyles(styles)(LookupEditCellBase);

  const EditCell = props => {
    const { column } = props;
    const availableColumnValues = availableValues[column.name];
    if (availableColumnValues) {
      return (
        <LookupEditCell
          {...props}
          availableColumnValues={availableColumnValues}
        />
      );
    }
    return <TableEditRow.Cell {...props} />;
  };

  return (
    <div>
      <SectionHeader Icon={GroupIcon}>Joined Players</SectionHeader>
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
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            cellComponent={cmdCellComponent}
            commandComponent={Command}
            headerCellComponent={cmdHeaderComponent}
            showEditCommand
            showDeleteCommand
            width={80}
          />
        </Grid>
      </Paper>
      <InviteTable teams={teams} invites={[]} />
    </div>
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
