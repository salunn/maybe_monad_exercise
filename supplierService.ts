import { PartRepository } from "./partRepository";
import { SupplierRepository } from "./supplierRepository";

export function getSupplierName(
  partId: string,
  partRepository: PartRepository,
  supplierRepository: SupplierRepository
) {
  if (partId) {
    const part = partRepository.findById(parseInt(partId));
    if (part && part.supplierId) {
      const supplier = supplierRepository.findById(part.supplierId);
      if (supplier) {
        return supplier.name;
      }
    }
  }
}
