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
import { Teams, Invite } from "../../models";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import {
  GroupAddButton,
  EditButton,
  CommitButton,
  DeleteButton,
  CancelButton
} from "../ItemTable/CommandButtons";
import SectionHeader from "../SectionHeader";
import { validateEmail } from "../../utils";
import { Invites } from "../../models";

const styles = theme => ({
  commandCell: {
    paddingLeft: theme.spacing(1)
  },
  disabled: {
    color: theme.palette.disabled.main
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

function InviteTable(props) {
  const { classes, huntID, invites, setInvites, teams } = props;

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [editing, setEditing] = useState({});
  const [rowsInInvalidState, setRowsInInvalidState] = useState(new Set([]));

  const isEditing = (rowID, column) => {
    return editing.rowID === rowID && editing.column === column ? true : false;
  };
  const isInInvalidState = row => rowsInInvalidState.has(getRowId(row));

  const getRowId = row => (row ? row.inviteID : 0);

  function commitChanges({ added, deleted }) {
    if (added) {
      added.forEach(rowData => {
        let invite = new Invite({
          email: rowData.email,
          huntID: huntID,
          teamID: rowData.team ? getTeamID(rowData.team) : null
        });

        invite.apiCreate().then(response => {
          setInvites(invites.add(new Invite(response.data)));
        });
      });
    }
    if (deleted) {
      deleted.forEach(id => {
        let invite = invites.getByID(id);
        invite.apiDelete().then(response => {
          setInvites(invites.remove(invite));
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
  const Command = ({ id, onExecute, disabled, ...restProps }) => {
    const CommandComponent = cmds[id];

    return (
      <CommandComponent
        classes={
          id === "cancel"
            ? { label: classes.error }
            : disabled
            ? { label: classes.disabled }
            : null
        }
        disabled={disabled}
        onExecute={onExecute}
      />
    );
  };
  const isCommitCommand = child => {
    return !child
      ? false
      : !child.props
      ? false
      : Boolean(child.props.id === "commit");
  };
  function cmdCellComponent({ children, row }) {
    if (isInInvalidState(row)) {
      children = React.Children.map(children, child => {
        if (isCommitCommand(child)) {
          return React.cloneElement(child, { disabled: true });
        }
        return child;
      });
    }
    return <td className={classes.commandCell}>{children}</td>;
  }
  function cmdHeaderComponent({ children }) {
    return <td className={classes.headerCommandCell}>{children}</td>;
  }

  const cols = [
    {
      name: "email",
      title: "Email",
      getCellValue: row => {
        return row.email;
      }
    },
    {
      name: "team",
      title: "Team",
      getCellValue: row => getTeam(row)
    }
  ];

  const colExtensions = [
    { columnName: "email", align: "left", wordWrapEnabled: true },
    { columnName: "team", align: "left", width: 120 }
  ];

  const sortingExtensions = [
    { columnName: "email", sortingEnabled: true },
    { columnName: "team", sortingEnabled: true }
  ];
  const editingExtensions = [
    {
      columnName: "email",
      editingEnabled: true
    }
  ];

  function UsernameEditor({ row, value, onValueChange }) {
    const input = value ? value : row.email;
    const err = validateEmail(input);
    return (
      <TextField
        autoFocus={isEditing(getRowId(row), "email")}
        error={err.inError ? true : null}
        FormHelperTextProps={err.inError ? { error: true } : null}
        helperText={err.msg}
        id="email-editor"
        margin="normal"
        onChange={e => {
          if (!isEditing(getRowId(row), "email")) {
            setEditing({ rowID: getRowId(row), column: "email" });
          }
          const input = e.currentTarget.value;
          const err = validateEmail(input);
          if (err.inError && !isInInvalidState(row)) {
            setRowsInInvalidState(rowsInInvalidState.add(getRowId(row)));
          }

          if (!err.inError && isInInvalidState(row)) {
            rowsInInvalidState.delete(getRowId(row));
            setRowsInInvalidState(rowsInInvalidState);
          }
          onValueChange(e.currentTarget.value);
        }}
        type="text"
        value={input}
        variant="standard"
      />
    );
  }
  function EmailTypeProvider(props) {
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
  const NoDataCell = ({ getMessage }) => {
    return (
      <td className={classes.noDataCell} colSpan={cols.length + 1}>
        <Typography className={classes.noDataMsg}>No invites</Typography>
      </td>
    );
  };

  return (
    <div>
      <SectionHeader Icon={ContactMailIcon}>Invites</SectionHeader>
      <Paper className={classes.paper}>
        <Grid columns={cols} getRowId={getRowId} rows={invites.array}>
          <EditingState
            columnExtensions={editingExtensions}
            addedRows={addedRows}
            onAddedRowsChange={addedRows => {
              setAddedRows(addedRows);
            }}
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
          <EmailTypeProvider for={["email"]} />
          <Table
            columnExtensions={colExtensions}
            noDataCellComponent={NoDataCell}
          />
          <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
          <TableEditRow cellComponent={EditCell} />
          <TableEditColumn
            cellComponent={cmdCellComponent}
            commandComponent={Command}
            headerCellComponent={cmdHeaderComponent}
            showAddCommand={!addedRows.length}
            showDeleteCommand
            width={50}
          />
        </Grid>
      </Paper>
    </div>
  );
}

InviteTable.propTypes = {
  classes: PropTypes.object.isRequired,
  huntID: PropTypes.number.isRequired,
  invites: PropTypes.instanceOf(Invites).isRequired,
  setInvites: PropTypes.func.isRequired,
  teams: PropTypes.instanceOf(Teams).isRequired
};

export default withStyles(styles)(InviteTable);
