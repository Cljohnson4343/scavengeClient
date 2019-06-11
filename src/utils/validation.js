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

export function validateTeam(name, maxTeams, numTeams) {
  let err = validateMaxTeams(maxTeams, numTeams);
  if (err.inError) {
    return err;
  }

  return validateTeamName(name);
}

const MinTeams = 1;

export function validateMaxTeams(maxTeams, numTeams) {
  if (numTeams < MinTeams) {
    return new ScavengeError(`Must have at least ${MinTeams} teams`);
  }

  if (numTeams > maxTeams) {
    return new ScavengeError(`Hunt has more teams than 'Max Teams' setting`);
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
