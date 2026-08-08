import { describe, expect, it } from "vitest";
import { slugify } from "../../src/utils/slug.js";

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Lalibela Churches Tour")).toBe("lalibela-churches-tour");
  });

  it("collapses runs of non-alphanumeric characters", () => {
    expect(slugify("Addis  Ababa  !!")).toBe("addis-ababa");
  });

  it("maps ampersands to 'and'", () => {
    expect(slugify("Rock & Roll")).toBe("rock-and-roll");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify(" --Semi- Colon-- ")).toBe("semi-colon");
  });

  it("returns empty string for non-word input", () => {
    expect(slugify("!!!")).toBe("");
  });
});