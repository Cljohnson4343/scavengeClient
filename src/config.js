export const BASE_PATH =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_SCAVENGE_SERVER_URL;
