import { expect, test } from "vitest";
import { factory } from "../builder";

describe("#build", () => {
  test("builds entities", () => {
    const user = {
      name: "Connor",
      age: 28,
    };

    expect(factory(user).build()).toEqual(user);
  });

  test("overrides entities", () => {
    const actual = {
      name: "Connor",
      age: 28,
    };
    const expected = {
      name: "Connor",
      age: 29,
    };

    expect(factory(actual).build({ age: 29 })).toEqual(expected);
  });
});

describe("#buildList", () => {
  test("builds entities", () => {
    const user = {
      name: "Connor",
      age: 28,
    };

    expect(factory(user).buildList()).toEqual([user]);
  });
});
