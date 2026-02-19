import 'dotenv/config';
import app from './app.js';
import { connectDB } from './src/db/mongo.js';

const PORT = Number(process.env.PORT) || 10000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

connectDB().catch((error) => {
    console.error('Fallo la conexion a MongoDB:', error.message);
});
