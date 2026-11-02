import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Empleado, empleadoVacio } from '../models/empleado';

// Respuesta que devuelve el backend al crear/actualizar/eliminar
export interface RespuestaApi {
  mensaje: string;
  empleado?: Empleado;
}

/**
 * Servicio que comunica el frontend (Angular) con el backend (API REST).
 * Todos los componentes usan este servicio para pedir o enviar datos.
 */
@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private http = inject(HttpClient);
  private readonly URL_API = environment.apiUrl;

  // Estado compartido entre componentes
  empleados = signal<Empleado[]>([]);
  empleadoSeleccionado = signal<Empleado>(empleadoVacio());

  // GET: obtener todos los empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.URL_API);
  }

  // POST: crear un empleado
  postEmpleado(empleado: Empleado): Observable<RespuestaApi> {
    return this.http.post<RespuestaApi>(this.URL_API, empleado);
  }

  // PUT: actualizar un empleado
  putEmpleado(empleado: Empleado): Observable<RespuestaApi> {
    return this.http.put<RespuestaApi>(`${this.URL_API}/${empleado._id}`, empleado);
  }

  // DELETE: eliminar un empleado
  deleteEmpleado(id: string): Observable<RespuestaApi> {
    return this.http.delete<RespuestaApi>(`${this.URL_API}/${id}`);
  }

  // Vuelve a consultar la lista y actualiza la tabla
  cargarEmpleados(): void {
    this.getEmpleados().subscribe({
      next: (data) => this.empleados.set(data),
      error: () => this.mostrarMensaje('No se pudo conectar con el servidor', 'red'),
    });
  }

  // Mensaje emergente de Materialize (toast)
  mostrarMensaje(texto: string, color = 'teal'): void {
    const M = (window as any).M;
    if (M?.toast) {
      M.toast({ html: texto, classes: `${color} rounded` });
    }
  }
}
