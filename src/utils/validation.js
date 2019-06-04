import { ScavengeError } from "./error";

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email) {
  if (emailRegex.test(email)) {
    return new ScavengeError();
  } else {
    return new ScavengeError("Must be a valid email");
  }
}

export function validateEndDate(start, end) {
  if (start.getTime() >= end.getTime()) {
    return new ScavengeError("Must not end before it starts");
  }

  return new ScavengeError();
}

export function validateHuntName(name) {
  if (!name || typeof name !== "string") {
    return new ScavengeError("Must be a non-nil string");
  }

  return new ScavengeError();
}

export function validateTeamName(name) {
  if (!name || typeof name !== "string") {
    return new ScavengeError("Must have at least one character");
  }

  return new ScavengeError();
}

const MinTeams = 1;
const MaxTeams = 19;

export function validateMaxTeams(numTeams) {
  if (numTeams < MinTeams) {
    return new ScavengeError(`Must be at least ${MinTeams}`);
  }

  if (numTeams > MaxTeams) {
    return new ScavengeError(`Must be less than ${MaxTeams}`);
  }
  return new ScavengeError();
}

export function validateStartDate(start) {
  if (start.getTime() < new Date()) {
    return new ScavengeError("Must not start in the past");
  }

  return new ScavengeError();
}

export function validateItemName(name) {
  if (!name || typeof name !== "string") {
    return new ScavengeError("Must have at least one character");
  }

  return new ScavengeError();
}

export function validateItemPoints(points) {
  if (typeof points !== "number") {
    return new ScavengeError("Item points must be a number");
  }

  if (points < 1) {
    return new ScavengeError("Must be greater than 0");
  }
  return new ScavengeError();
}
