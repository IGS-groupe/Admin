// src/app/models/parameter.model.ts
export interface Parameter {
    parameterId?: number;  
    name: string;
    rdl: number;  
    unit: string;
    available?:boolean | null;
  }
  