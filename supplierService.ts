import { Maybe } from "./maybe.monad.ts";
import { PartRepository } from "./partRepository";
import { SupplierRepository } from "./supplierRepository";

export const elevate: <T, R>(fn: (x: T) => R | undefined) => (y: T) => Maybe<R> = (fn) => (y) => {
    const result = fn(y);
    return Maybe.fromValue(result);
} 

export function getSupplierName(
  partId: string,
  partRepository: PartRepository,
  supplierRepository: SupplierRepository
) {
  const partIdMonad = Maybe.of(partId);
  const supplierName = partIdMonad
    .flatMap(elevate(parseInt))
    .flatMap(partRepository.findById)
    .flatMap(elevate(x => x.supplierId))
    .flatMap(supplierRepository.findById)
    .flatMap(elevate(x => x.name))
    .value;

    
    const chainSupplierName = partIdMonad.chain([
      // @ts-ignore 
      parseInt,
      // @ts-ignore
      partRepository.findById,
      // @ts-ignore
      x => x.supplierId,
      // @ts-ignore
      supplierRepository.findById,
      // @ts-ignore
      x => x.name
    ]);

    return chainSupplierName.value;

   /* if (partId) {
     const part = partRepository.findById(parseInt(partId));
     if (part && part.supplierId) {
       const supplier = supplierRepository.findById(part.supplierId);
       if (supplier) {
         return supplier.name;
       }
     }
   } */
}
