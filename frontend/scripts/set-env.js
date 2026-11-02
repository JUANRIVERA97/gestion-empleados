// =============================================================
// Antes de compilar, escribe la URL de la API en environment.ts
// En Vercel se define la variable de entorno API_URL, por ejemplo:
//   API_URL = https://mi-backend.vercel.app/api/empleados
// Si no existe, se usa la API local (http://localhost:3000)
// =============================================================
const fs = require('fs');
const path = require('path');

let apiUrl = (process.env.API_URL || 'http://localhost:3000/api/empleados').trim().replace(/\/+$/, '');
// Si solo pusieron el dominio del backend, se agrega la ruta de la API
if (!apiUrl.endsWith('/api/empleados')) apiUrl += '/api/empleados';

const contenido = `export const environment = {
  // Dirección de la API REST (backend). Generado por scripts/set-env.js
  apiUrl: '${apiUrl}',
};
`;

const destino = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
fs.writeFileSync(destino, contenido);
console.log('API_URL configurada:', apiUrl);
