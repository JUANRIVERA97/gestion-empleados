// =============================================================
// Punto de entrada del backend EN VERCEL (función serverless)
// Vercel recibe cada petición y se la entrega a la app de Express
// =============================================================
const app = require('../src/app');

module.exports = app;
