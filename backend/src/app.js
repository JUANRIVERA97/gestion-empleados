// =============================================================
// Configuración de la aplicación Express (servidor)
// =============================================================
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const conectarDB = require('./config/database');

const app = express();

// ---------- Configuraciones ----------
app.set('port', process.env.PORT || 3000);

// ---------- Middlewares ----------
app.use(morgan('dev'));  // Muestra cada petición en la consola
app.use(express.json()); // Permite recibir datos en formato JSON

// CORS: permite que el frontend (Angular) se comunique con la API.
// En Vercel se puede limitar con la variable FRONTEND_URL; si no existe, se permite cualquier origen.
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

// Asegura la conexión a MongoDB antes de atender cada petición
app.use(async (req, res, next) => {
  try {
    await conectarDB();
    next();
  } catch (error) {
    res.status(500).json({ mensaje: 'No se pudo conectar a la base de datos', error: error.message });
  }
});

// ---------- Rutas ----------
app.get('/', (req, res) => {
  res.json({ mensaje: 'API REST - Gestión de Empleados funcionando', ruta: '/api/empleados' });
});
app.use('/api/empleados', require('./routes/empleado.routes'));

module.exports = app;
