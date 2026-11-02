import { Component, computed, effect, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado';
import { Empleado, empleadoVacio } from '../../models/empleado';

/**
 * Componente del formulario: sirve para CREAR y para EDITAR empleados.
 * Si el empleado tiene _id, se actualiza (PUT); si no, se crea (POST).
 */
@Component({
  selector: 'app-empleado-form',
  imports: [FormsModule],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.css',
})
export class EmpleadoForm {
  private empleadoService = inject(EmpleadoService);

  // Copia local de los datos del formulario
  empleado: Empleado = empleadoVacio();

  // ¿Estamos editando? (true si el empleado seleccionado ya tiene _id)
  editando = computed(() => !!this.empleadoService.empleadoSeleccionado()._id);

  constructor() {
    // Cada vez que se selecciona un empleado en la tabla, se copia al formulario
    effect(() => {
      this.empleado = { ...this.empleadoService.empleadoSeleccionado() };
    });
  }

  guardar(form: NgForm): void {
    if (form.invalid) {
      this.empleadoService.mostrarMensaje('Completa todos los campos', 'orange darken-2');
      return;
    }

    const peticion = this.empleado._id
      ? this.empleadoService.putEmpleado(this.empleado)   // Actualizar
      : this.empleadoService.postEmpleado(this.empleado); // Crear

    peticion.subscribe({
      next: (res) => {
        this.empleadoService.mostrarMensaje(res.mensaje);
        this.limpiar(form);
        this.empleadoService.cargarEmpleados();
      },
      error: (err) => {
        this.empleadoService.mostrarMensaje(err.error?.mensaje || 'Error al guardar', 'red');
      },
    });
  }

  limpiar(form?: NgForm): void {
    form?.resetForm();
    this.empleadoService.empleadoSeleccionado.set(empleadoVacio());
  }
}
