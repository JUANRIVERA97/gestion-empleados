import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { EmpleadoService } from '../../services/empleado';
import { Empleado } from '../../models/empleado';

/**
 * Componente de la tabla: muestra los empleados guardados en MongoDB
 * y permite seleccionarlos para editar o eliminarlos.
 */
@Component({
  selector: 'app-empleado-list',
  imports: [CurrencyPipe],
  templateUrl: './empleado-list.html',
  styleUrl: './empleado-list.css',
})
export class EmpleadoList implements OnInit {
  empleadoService = inject(EmpleadoService);

  // Al abrir la página se cargan los empleados desde la API
  ngOnInit(): void {
    this.empleadoService.cargarEmpleados();
  }

  editar(empleado: Empleado): void {
    this.empleadoService.empleadoSeleccionado.set({ ...empleado });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(empleado: Empleado): void {
    if (!empleado._id) return;
    this.empleadoService.deleteEmpleado(empleado._id).subscribe({
      next: (res) => {
        this.empleadoService.mostrarMensaje(`${empleado.nombre}: ${res.mensaje}`, 'red darken-1');
        this.empleadoService.cargarEmpleados();
      },
      error: () => this.empleadoService.mostrarMensaje('Error al eliminar', 'red'),
    });
  }
}
