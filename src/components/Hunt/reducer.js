import { combineReducers } from "../../utils";
import {
  huntName,
  locationName,
  latitude,
  longitude,
  maxTeams,
  startDate,
  endDate
} from "../../reducers";

export default combineReducers({
  huntName,
  locationName,
  latitude,
  longitude,
  maxTeams,
  startDate,
  endDate
});

export const getInitialState = hunt => ({
  huntName: hunt.name,
  locationName: hunt.locationName,
  latitude: hunt.latitude,
  longitude: hunt.longitude,
  maxTeams: hunt.maxTeams,
  startDate: hunt.starts,
  endDate: hunt.ends
});
