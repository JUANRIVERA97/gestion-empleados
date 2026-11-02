// =============================================================
// Rutas de la API REST de Empleados
// Conecta cada URL + método HTTP con su función del controlador
// =============================================================
const { Router } = require('express');
const empleadoCtrl = require('../controllers/empleado.controller');

const router = Router();

router.get('/', empleadoCtrl.getEmpleados);         // Listar
router.post('/', empleadoCtrl.createEmpleado);      // Crear
router.get('/:id', empleadoCtrl.getEmpleado);       // Consultar uno
router.put('/:id', empleadoCtrl.updateEmpleado);    // Actualizar
router.delete('/:id', empleadoCtrl.deleteEmpleado); // Eliminar

module.exports = router;
