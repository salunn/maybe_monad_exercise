import { Maybe } from "./maybe.monad";
import { PartRepository } from "./partRepository";
import { Supplier, SupplierRepository } from "./supplierRepository";

export function getSupplierName(
  partId: string,
  partRepository: PartRepository,
  supplierRepository: SupplierRepository
) {
  if (partId) {
    return partRepository.findById(parseInt(partId))
      .flatMap(part => part.supplierId 
      ? supplierRepository.findById(part.supplierId)
      : Maybe.nothing<Supplier>()
      )
      .map(supplier => supplier.name)
      .getOrElse("");
  }
}
