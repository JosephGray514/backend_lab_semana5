import 'dotenv/config';
import app from './app.js';
import { connectDB } from './src/db/mongo.js';

await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
