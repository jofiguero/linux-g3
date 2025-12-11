import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import path from 'path';
import gameRoutes from './controllers/game';
import unknownEndpoint from './utils/middleware';

const app = express();

app.use(cors());
app.use(express.json());

// API routes primero
app.use('/api/games', gameRoutes);

// Servir archivos estáticos desde la raíz
const frontendPath = path.join(__dirname, '../public');
app.use(express.static(frontendPath));

// Fallback para SPA - sirve index.html para cualquier ruta que no sea API
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(unknownEndpoint);

export default app;