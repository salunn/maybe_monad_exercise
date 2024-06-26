export type Supplier = {
  id: number;
  name: string;
};

export interface SupplierRepository {
  findById: (id: number) => Supplier;
}

export const supplierRepository: SupplierRepository = {
  findById: (id) => {
    const suppliers: Supplier[] = [
      { id: 1, name: "wheelerdealer" },
      { id: 2, name: "DrivesticksRUs" },
      { id: 3, name: "supplier inc." },
    ];

    const res = suppliers.filter((s) => s.id === id);
    return res[0] ?? null;
  },
};
