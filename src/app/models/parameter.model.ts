// src/app/models/parameter.model.ts
export interface Parameter {
    id?: number;  // Optional for creation
    name: string;
    rdl: number;  // Use 'number' type for BigDecimal equivalent in TypeScript
    unit: string;
  }
  