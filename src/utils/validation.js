const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function validateHuntDates(start, end) {
  if (start.getTime() > end.getTime()) {
    return "Hunt must start before it ends";
  }

  if (start.getTime() < new Date()) {
    return "Hunt must not start in the past";
  }

  return "";
}
