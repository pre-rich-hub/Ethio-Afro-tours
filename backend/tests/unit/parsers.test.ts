import { describe, expect, it } from "vitest";
import {
  parseJsonArray,
  parseOptionalJsonArrayString,
  toBoolean,
  toNumber
} from "../../src/utils/parsers.js";

describe("parseJsonArray", () => {
  it("parses a JSON array string", () => {
    expect(parseJsonArray('["a","b"]')).toEqual(["a", "b"]);
  });

  it("returns [] for non-arrays and non-strings", () => {
    expect(parseJsonArray('{"a":1}')).toEqual([]);
    expect(parseJsonArray(undefined)).toEqual([]);
    expect(parseJsonArray("not json")).toEqual([]);
  });
});

describe("parseOptionalJsonArrayString", () => {
  it("keeps valid JSON arrays as strings", () => {
    expect(parseOptionalJsonArrayString('[1,2]')).toBe('[1,2]');
  });

  it("converts newline/comma lists into a JSON array", () => {
    expect(parseOptionalJsonArrayString("day 1\nday 2")).toBe('["day 1","day 2"]');
  });

  it("returns [] for empty input", () => {
    expect(parseOptionalJsonArrayString("")).toBe("[]");
    expect(parseOptionalJsonArrayString(undefined)).toBe("[]");
  });
});

describe("toNumber", () => {
  it("parses numeric strings", () => {
    expect(toNumber("125.50")).toBe(125.5);
  });

  it("returns null for empty or non-numeric input", () => {
    expect(toNumber("")).toBeNull();
    expect(toNumber(null)).toBeNull();
    expect(toNumber("abc")).toBeNull();
  });
});

describe("toBoolean", () => {
  it("accepts booleans and truthy strings", () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean("true")).toBe(true);
    expect(toBoolean("1")).toBe(true);
    expect(toBoolean("on")).toBe(true);
    expect(toBoolean(1)).toBe(true);
  });

  it("rejects anything else", () => {
    expect(toBoolean(false)).toBe(false);
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean("yes")).toBe(false);
  });
});