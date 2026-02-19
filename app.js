import express from 'express';
import cors from 'cors'
import fileRoutes from './src/routes/file.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', fileRoutes);

export default app;