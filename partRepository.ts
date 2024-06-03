export type Part = {
  id: number;
  name: string;
  supplierId?: number;
};

export interface PartRepository {
  findById: (id: number) => Part;
}

export const partRepository: PartRepository = {
  findById: (id) => {
    const parts: Part[] = [
      { id: 1, name: "engine", supplierId: 1 },
      { id: 2, name: "pedals" },
      { id: 3, name: "wheels", supplierId: 2 },
      { id: 4, name: "steering wheel", supplierId: 4 },
    ];

    const res = parts.filter((p) => p.id === id);
    return res[0] ?? null;
  },
};
