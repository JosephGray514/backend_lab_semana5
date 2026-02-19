import { GridFSBucket, MongoClient } from 'mongodb';

let db;
let client;
let bucket;

export async function connectDB() {
  if (db) return db;

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida');
    }
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
  }

  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  db = client.db(process.env.DB_NAME);
  console.log('MongoDB conectado');

  bucket = new GridFSBucket(db, {
    bucketName: 'uploads'
  });
}

export function getDB() {
  try {
    if (!db) {
      throw new Error('DB no inicializada');
    }
  } catch (error) {
    console.log(`Error al obtener la base de datos: ${error}`); 
  }
  return db;
}

export function getBucket(){
  try {
    if(!bucket) {
      throw new Error('Bucket no inicializadad');
    }
  } catch (error) {
    console.log(`Error al obtener el bucket: ${error}`); 
  }
  return bucket
}