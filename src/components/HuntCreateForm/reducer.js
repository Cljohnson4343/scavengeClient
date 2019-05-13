import { combineReducers } from "../../utils";

export const initialState = {
  teams: [],
  players: [],
  huntName: "",
  maxTeams: 0,
  startDate: new Date(),
  endDate: new Date()
};

export default combineReducers({
  teams,
  players,
  huntName,
  maxTeams,
  startDate,
  endDate
});

function teams(state = [], action) {
  switch (action.type) {
    case "remove_team":
      return state.filter(team => !team.equals(action.payload));
    case "add_team":
      return state.concat(state, action.payload);
    case "change_players_team":
      return state.map(team => {
        if (team.hasPlayer(action.payload.player)) {
          team.removePlayer(action.payload.player);
        }
        if (team.equals(action.payload.team)) {
          team.addPlayer(action.payload.player);
        }
        return Object.assign({}, team);
      });
    default:
      return state;
  }
}

function players(state = [], action) {
  switch (action.type) {
    case "remove_player":
      return state.filter(player => !player.equals(action.payload));
    case "add_player":
      return state.concat(state, action.payload);
    case "change_players_team":
      return state.map(player => {
        if (player.equals(action.payload.player)) {
          player.team(action.payload.team);
        }
        return Object.assign({}, player);
      });
    default:
      return state;
  }
}

function huntName(state = "", action) {
  switch (action.type) {
    case "update_hunt_name":
      return action.payload;
    default:
      return state;
  }
}

function maxTeams(state = 0, action) {
  switch (action.type) {
    case "update_max_teams":
      return action.payload;
    default:
      return state;
  }
}

function startDate(state = new Date(), action) {
  switch (action.type) {
    case "update_start":
      return action.payload;
    default:
      return state;
  }
}

function endDate(state = new Date(), action) {
  switch (action.type) {
    case "update_end":
      return action.payload;
    default:
      return state;
  }
}
