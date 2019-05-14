import { uniqueLabel } from "./label";

test.each`
  name        | names                                                       | expected
  ${"Fins"}   | ${["Fins", "A", "Bills", "Lakers", "fins43", "fox", "fin"]} | ${"FS"}
  ${"fins43"} | ${["abc", "abc43", "pats", "fins", "log"]}                  | ${"F4"}
  ${"w3"}     | ${["w", "w33", "w3"]}                                       | ${"W3"}
`(
  "returns $expected to be unique label for $name",
  ({ name, names, expected }) => {
    expect(uniqueLabel(names, name)).toBe(expected);
  }
);
