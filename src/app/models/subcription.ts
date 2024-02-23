export interface Subscription {
    id?: number; // El ID podría ser opcional dependiendo de cómo manejes la creación de suscripciones en tu aplicación
    start_date: string; // Fecha de inicio de la suscripción (formato ISO 8601)
    end_date: string; // Fecha de fin de la suscripción (formato ISO 8601)
    id_user: number; // ID del usuario asociado a la suscripción
  }
  