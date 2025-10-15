import mysql from 'mysql2/promise';

export async function connectDB() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Sebastian2006.',
    database: process.env.DB_NAME || 'auth_system',
  });
}