import { beforeEach, describe, expect, it, vi } from "vitest";

const deleteMock = vi.fn(async () => {});
vi.mock("../../src/services/storage/index.js", () => ({
  getStorageProvider: async () => ({ delete: deleteMock })
}));

import { removeStoredFile } from "../../src/services/file.service.js";

// removeStoredFile receives either a stored path (local driver:
// "assets/…" / bare media id for the database driver) or a URL form
// back from stored rows ("/assets/…" or "/api/v1/media/<uuid>"). The
// URL forms must be normalized to stored paths or the local driver
// resolves outside the upload root and the database driver never
// matches a media id — leaking files on replace/remove/delete.
describe("removeStoredFile", () => {
  beforeEach(() => deleteMock.mockClear());

  it("passes local stored paths through unchanged", async () => {
    await removeStoredFile("assets/images/layover/LAY-1.png");
    expect(deleteMock).toHaveBeenCalledWith("assets/images/layover/LAY-1.png");
  });

  it("normalizes the local URL form (leading slash) to a stored path", async () => {
    await removeStoredFile("/assets/images/layover/LAY-1.png");
    expect(deleteMock).toHaveBeenCalledWith("assets/images/layover/LAY-1.png");
  });

  it("normalizes a media URL to the bare stored media id", async () => {
    await removeStoredFile("/api/v1/media/abc-123");
    expect(deleteMock).toHaveBeenCalledWith("abc-123");
  });

  it("leaves a bare media id untouched", async () => {
    await removeStoredFile("abc-123");
    expect(deleteMock).toHaveBeenCalledWith("abc-123");
  });

  it("does nothing for null or undefined", async () => {
    await removeStoredFile(null);
    await removeStoredFile(undefined);
    expect(deleteMock).not.toHaveBeenCalled();
  });
});
