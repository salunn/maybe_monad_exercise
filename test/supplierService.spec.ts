import assert from "assert";
import { getSupplierName } from "../supplierService.ts";
import { partRepository } from "../partRepository.ts";
import { supplierRepository } from "../supplierRepository.ts";
import { describe, it } from "node:test";
import { Maybe } from "../maybe.monad.ts";

describe("supplier service", () => {
  it("returns supplier name", () => {
    assert.strictEqual(
      getSupplierName(Maybe.some("1"), partRepository, supplierRepository),
      "wheelerdealer"
    );
  });

  it("returns undefined when no part id", () => {
    assert.equal(
      getSupplierName(Maybe.none(), partRepository, supplierRepository),
      null
    );
  });

  it("returns undefined when part has no supplier", () => {
    assert.equal(
      getSupplierName(Maybe.some("2"), partRepository, supplierRepository),
      null
    );
  });

  it("returns undefined when no part with given id", () => {
    assert.equal(
      getSupplierName(Maybe.some("666"), partRepository, supplierRepository),
      null
    );
  });

  it("returns undefined when no supplier with given id", () => {
    assert.equal(
      getSupplierName(Maybe.some("4"), partRepository, supplierRepository),
      null
    );
  });
});
