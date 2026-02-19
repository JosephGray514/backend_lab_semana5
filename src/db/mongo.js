import { GridFSBucket, MongoClient } from 'mongodb';

let db;
let client;
let bucket;

export async function connectDB() {
  if (db) return db;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    throw new Error('MONGODB_URI no esta definida');
  }

  if (!dbName) {
    throw new Error('DB_NAME no esta definida');
  }

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000
  });

  await client.connect();

  db = client.db(dbName);
  console.log('MongoDB conectado');

  bucket = new GridFSBucket(db, {
    bucketName: 'uploads'
  });

  return db;
}

export function getDB() {
  if (!db) {
    throw new Error('DB no inicializada');
  }
  return db;
}

export function getBucket(){
  if(!bucket) {
    throw new Error('Bucket no inicializado');
  }
  return bucket;
}