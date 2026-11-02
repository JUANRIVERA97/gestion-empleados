// =============================================================
// Controlador de Empleados
// Contiene la lógica de cada operación del CRUD
// =============================================================
const Empleado = require('../models/empleado.model');

const empleadoCtrl = {};

// GET /api/empleados  -> Listar todos los empleados
empleadoCtrl.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find().sort({ createdAt: -1 });
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar empleados', error: error.message });
  }
};

// GET /api/empleados/:id  -> Consultar un empleado
empleadoCtrl.getEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json(empleado);
  } catch (error) {
    res.status(400).json({ mensaje: 'ID no válido', error: error.message });
  }
};

// POST /api/empleados  -> Crear un empleado
empleadoCtrl.createEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, oficina, salario } = req.body;
    const empleado = new Empleado({ nombre, cargo, oficina, salario });
    await empleado.save();
    res.status(201).json({ mensaje: 'Empleado guardado', empleado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos no válidos', error: error.message });
  }
};

// PUT /api/empleados/:id  -> Actualizar un empleado
empleadoCtrl.updateEmpleado = async (req, res) => {
  try {
    const { nombre, cargo, oficina, salario } = req.body;
    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      { nombre, cargo, oficina, salario },
      { new: true, runValidators: true }
    );
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Empleado actualizado', empleado });
  } catch (error) {
    res.status(400).json({ mensaje: 'Datos no válidos', error: error.message });
  }
};

// DELETE /api/empleados/:id  -> Eliminar un empleado
empleadoCtrl.deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Empleado eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: 'ID no válido', error: error.message });
  }
};

module.exports = empleadoCtrl;
