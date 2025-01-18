import { deepClone } from "./utils";

interface GeneratedFixture<Fixture> {
  build: (fixture?: Partial<Fixture>) => Fixture;
  buildList: (data?: Partial<Fixture>, count?: number) => Fixture[];
}

function factory<Fixture>(fixture: Fixture): GeneratedFixture<Fixture> {
  return {
    build: (overrides) => {
      return {
        ...deepClone(fixture),
        ...overrides,
      };
    },
    buildList: (overrides, count = 1) => {
      return new Array().fill(count).map(() => this.build(overrides));
    },
  };
}

export { factory };
