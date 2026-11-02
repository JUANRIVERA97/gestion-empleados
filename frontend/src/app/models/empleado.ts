// Modelo de datos del Empleado (igual al esquema del backend)
export interface Empleado {
  _id?: string;
  nombre: string;
  cargo: string;
  oficina: string;
  salario: number | null;
  createdAt?: string;
  updatedAt?: string;
}

// Crea un empleado vacío para limpiar el formulario
export function empleadoVacio(): Empleado {
  return { nombre: '', cargo: '', oficina: '', salario: null };
}
