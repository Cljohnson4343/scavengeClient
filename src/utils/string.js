// returns one or two char unique label for the given name. Assumes that names are unique
export function uniqueLabel(names, name) {
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
