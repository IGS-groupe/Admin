// src/app/models/user.model.ts
export interface Role {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    firstName: string | null;
    lastName: string;
    username: string;
    email: string;
    password: string;
    genre: string;
    active: boolean;
    activationToken: string | null;
    resetToken: string | null;
    roles: Role[];
  }
  