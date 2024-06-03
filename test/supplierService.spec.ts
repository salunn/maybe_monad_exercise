import assert from "assert";
import { getSupplierName } from "../supplierService.ts";
import { partRepository } from "../partRepository.ts";
import { supplierRepository } from "../supplierRepository.ts";
import { describe, it } from "node:test";

describe("supplier service", () => {
  it("returns supplier name", () => {
    assert.strictEqual(
      getSupplierName("1", partRepository, supplierRepository),
      "wheelerdealer"
    );
  });

  it("returns undefined when no part id", () => {
    assert.equal(
      getSupplierName("", partRepository, supplierRepository),
      undefined
    );
  });

  it("returns undefined when part has no supplier", () => {
    assert.equal(
      getSupplierName("2", partRepository, supplierRepository),
      undefined
    );
  });

  it("returns undefined when no part with given id", () => {
    assert.equal(
      getSupplierName("666", partRepository, supplierRepository),
      undefined
    );
  });

  it("returns undefined when no supplier with given id", () => {
    assert.equal(
      getSupplierName("4", partRepository, supplierRepository),
      undefined
    );
  });
});
