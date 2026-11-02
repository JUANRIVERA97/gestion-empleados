import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { EmpleadoForm } from './components/empleado-form/empleado-form';
import { EmpleadoList } from './components/empleado-list/empleado-list';

// Componente principal: reúne la barra, el formulario y la tabla
@Component({
  selector: 'app-root',
  imports: [Navbar, EmpleadoForm, EmpleadoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
