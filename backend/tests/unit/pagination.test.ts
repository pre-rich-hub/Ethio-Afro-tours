import { describe, expect, it } from "vitest";
import { getPagination, meta, paginationQuery } from "../../src/utils/pagination.js";

describe("getPagination", () => {
  it("applies defaults", () => {
    expect(getPagination({})).toEqual({ page: 1, limit: 20, skip: 0, take: 20 });
  });

  it("parses page/limit", () => {
    expect(getPagination({ page: "3", limit: "10" })).toEqual({ page: 3, limit: 10, skip: 20, take: 10 });
  });

  it("rejects invalid pages and limits", () => {
    expect(() => getPagination({ page: "0", limit: "10" })).toThrow();
    expect(() => getPagination({ page: "1", limit: "999" })).toThrow();
  });
});

describe("paginationQuery", () => {
  it("coerces string values", () => {
    const parsed = paginationQuery.parse({ page: "2", limit: "5" });
    expect(parsed).toEqual({ page: 2, limit: 5 });
  });
});

describe("meta", () => {
  it("computes totalPages", () => {
    expect(meta(45, 2, 10)).toEqual({ total: 45, page: 2, limit: 10, totalPages: 5 });
    expect(meta(0, 1, 20)).toEqual({ total: 0, page: 1, limit: 20, totalPages: 0 });
    expect(meta(10, 1, 20)).toEqual({ total: 10, page: 1, limit: 20, totalPages: 1 });
  });
});