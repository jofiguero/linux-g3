import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import path from 'path';
import gameRoutes from './controllers/game';
import unknownEndpoint from './utils/middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/games', gameRoutes);


const frontendPath = path.join(__dirname, '../public');
app.use(express.static(frontendPath));

app.use(unknownEndpoint);

export default app;