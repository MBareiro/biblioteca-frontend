// beneficiary.model.ts
export interface Beneficiary {
  id?: number;
  name: string;
  last_name: string;
  phone: string;
  subscription?: string; // Agrega esta propiedad para almacenar el estado de la suscripción
}
