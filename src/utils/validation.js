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
    return new ScavengeError("Hunt must not end before it starts");
  }

  return new ScavengeError();
}

export function validateHuntName(name) {
  if (!name || typeof name !== "string") {
    return new ScavengeError("Must be a non-nil string");
  }

  return new ScavengeError();
}

const MinTeams = 1;
const MaxTeams = 19;

export function validateMaxTeams(numTeams) {
  if (numTeams < MinTeams) {
    return new ScavengeError(`Max teams must be at least ${MinTeams}`);
  }

  if (numTeams > MaxTeams) {
    return new ScavengeError(`Max teams must be less than ${MaxTeams}`);
  }
  return new ScavengeError();
}

export function validateStartDate(start) {
  if (start.getTime() < new Date()) {
    return new ScavengeError("Hunt must not start in the past");
  }

  return new ScavengeError();
}

export function validateItemName(name) {
  if (typeof name !== "string") {
    return new ScavengeError("Item name must be a string");
  }

  return new ScavengeError();
}

export function validateItemPoints(points) {
  if (typeof points !== "number") {
    return new ScavengeError("Item points must be a number");
  }

  if (points < 1) {
    return new ScavengeError("Item points must be greater than 0");
  }
  return new ScavengeError();
}
