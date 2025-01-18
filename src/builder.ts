import { deepClone, deepMerge } from "./utils";

interface GeneratedFixture<Fixture> {
  build: (fixture?: Partial<Fixture>) => Fixture;
  buildList: (data?: Partial<Fixture>, count?: number) => Fixture[];
  mutate: (mutations: Partial<Fixture>) => Fixture;
}

function factory<Fixture>(fixture: Fixture): GeneratedFixture<Fixture> {
  return {
    build(overrides) {
      return {
        ...deepClone(fixture),
        ...overrides,
      };
    },
    buildList(overrides, count = 1) {
      return Array.from({ length: count }).map(() => this.build(overrides));
    },
    mutate(mutations) {
      const target = fixture;
      const source = mutations;
      const mutatedFixture = deepMerge(target, source);
      return this.build(mutatedFixture);
    },
  };
}

export { factory };
