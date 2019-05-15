import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey
} from "@material-ui/core/colors";

const colors = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
  brown[500],
  grey[500],
  blueGrey[500]
];

function random(seed, min, max) {
  let x = Math.sin(seed) * 10000;
  let r = x - Math.floor(x);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(r * (max - min)) + min;
}

// returns one or two char unique label for the given name. Assumes that names are unique
export function uniqueLabel(names, name) {
  if (!Boolean(name) || typeof name !== "string") {
    return "";
  }

  let lowerName = name.toLowerCase();
  let ns = names
    .map(n => n.toLowerCase())
    .filter(n => !n.startsWith(lowerName));

  function reducer(acc, str) {
    let s = str.slice(1);
    if (s.length > 0) {
      return acc.concat(s);
    }
    return acc;
  }

  function uniqueIndex(str, strs, index) {
    let newStrs = strs.filter(s => str.charAt(0) === s.charAt(0));

    if (newStrs.length < 1) {
      return index;
    }

    return uniqueIndex(str.slice(1), newStrs.reduce(reducer, []), index + 1);
  }

  let index = uniqueIndex(lowerName, ns, 0);

  let label = name[0].toUpperCase();
  if (index < 1) {
    return label;
  }

  return label + name[index].toUpperCase();
}

export function avatarColors(huntName, numTeams) {
  let str = Boolean(huntName) ? huntName : "default";
  const seed = [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seeds = colors.map(color => seed + color.charCodeAt(3));
  let arr = [...colors];

  for (let i = colors.length - 1; i > 0; i--) {
    let x = random(seeds[i], 0, i);
    [arr[x], arr[i]] = [arr[i], arr[x]];
  }

  return arr.slice(0, numTeams);
}
