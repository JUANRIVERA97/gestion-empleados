// =============================================================
// Conexión a la base de datos MongoDB usando Mongoose
// Funciona en local y en Vercel (MongoDB Atlas)
// =============================================================
const mongoose = require('mongoose');

// En Vercel se define la variable de entorno MONGODB_URI (cadena de MongoDB Atlas).
// En local, si no existe, se usa el MongoDB instalado en el computador.
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestion_empleados';

// Se guarda la conexión para reutilizarla en cada petición (necesario en Vercel)
let conexion = null;

const conectarDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!conexion) {
    conexion = mongoose
      .connect(MONGODB_URI, { dbName: 'gestion_empleados' })
      .then((m) => {
        console.log('✅ Conectado a MongoDB:', m.connection.name);
        return m.connection;
      })
      .catch((error) => {
        conexion = null; // permite reintentar en la siguiente petición
        console.error('❌ Error al conectar a MongoDB:', error.message);
        throw error;
      });
  }
  return conexion;
};

module.exports = conectarDB;
