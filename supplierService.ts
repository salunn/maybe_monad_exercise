import { Maybe } from "./maybe.monad.ts";
import { PartRepository } from "./partRepository.ts";
import { SupplierRepository } from "./supplierRepository.ts";

export function getSupplierName(
  partId: Maybe<string>,
  partRepository: PartRepository,
  supplierRepository: SupplierRepository
) {
  return partId
    .flatMap((id) => Maybe.fromValue(parseInt(id)))
    .flatMap((partId) => partRepository.findById(partId))
    .flatMap((part) =>
      part.supplierId
        ? Maybe.some<number>(part.supplierId)
        : Maybe.none<number>()
    )
    .flatMap((supplierId) => supplierRepository.findById(supplierId))
    .map((supplier) => supplier.name)
    .getOrNull();
}
