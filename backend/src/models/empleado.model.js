// =============================================================
// Modelo (esquema) de Empleado
// Define cómo se guarda cada empleado en MongoDB
// =============================================================
const { Schema, model } = require('mongoose');

const empleadoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    cargo: {
      type: String,
      required: [true, 'El cargo es obligatorio'],
      trim: true,
    },
    oficina: {
      type: String,
      required: [true, 'La oficina es obligatoria'],
      trim: true,
    },
    salario: {
      type: Number,
      required: [true, 'El salario es obligatorio'],
      min: [0, 'El salario no puede ser negativo'],
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    versionKey: false, // Quita el campo __v
  }
);

module.exports = model('Empleado', empleadoSchema);
