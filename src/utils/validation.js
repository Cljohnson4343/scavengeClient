import { Error } from "./error";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email) {
  if (emailRegex.test(email)) {
    return new Error();
  } else {
    return new Error("Must be a valid email");
  }
}

export function validateEndDate(start, end) {
  if (start.getTime() >= end.getTime()) {
    return new Error("Hunt must not end before it starts");
  }

  return new Error();
}

export function validateHuntName(name) {
  if (!name || typeof name !== "string") {
    return new Error("Must be a non-nil string");
  }

  return new Error();
}

const MinTeams = 1;
const MaxTeams = 19;

export function validateMaxTeams(numTeams) {
  if (numTeams < MinTeams) {
    return new Error(`Max teams must be at least ${MinTeams}`);
  }

  if (numTeams > MaxTeams) {
    return new Error(`Max teams must be less than ${MaxTeams}`);
  }
  return new Error();
}

export function validateStartDate(start) {
  if (start.getTime() < new Date()) {
    return new Error("Hunt must not start in the past");
  }

  return new Error();
}
