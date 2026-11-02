// =============================================================
// Punto de entrada del backend EN LOCAL (npm run dev)
// En Vercel el punto de entrada es api/index.js
// =============================================================
require('dotenv').config();
const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`🚀 Servidor activo en http://localhost:${app.get('port')}`);
});
