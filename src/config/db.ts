import { Pool } from "pg";
import config from ".";

export const pool = new Pool({ connectionString: config.dbUri });
const initDb = async () => {
    await pool.query(` 
         CREATE TABLE IF NOT EXISTS vehicles(
         id SERIAL PRIMARY KEY,
         vehicle_name VARCHAR(250) NOT NULL,
         type VARCHAR(30) NOT NULL CHECK (type IN ('car','bike','van','SUV')),
         registration_number VARCHAR(20) UNIQUE NOT NULL,
         daily_rent_price INT NOT NULL CHECK(daily_rent_price > 0),
         availability_status VARCHAR(20) CHECK(availability_status IN ('available', 'booked'))
      )`);
    await pool.query(` 
         CREATE TABLE IF NOT EXISTS users( 
         id SERIAL PRIMARY KEY,
         name VARCHAR(50) NOT NULL,
         email VARCHAR(50) UNIQUE NOT NULL CHECK(email = LOWER(email)),
         password TEXT NOT NULL CHECK(char_length(password) >=6),
         phone VARCHAR(14) NOT NULL,
         role VARCHAR(20) CHECK(role IN ('admin','customer'))
      )`);
    await pool.query(`
         CREATE TABLE IF NOT EXISTS bookings( 
         id SERIAL PRIMARY KEY,
         customer_id INT REFERENCES users(id) ON DELETE CASCADE,
         vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
         rent_start_date DATE NOT NULL,
         rent_end_date DATE NOT NULL CHECK (rent_end_date >= rent_start_date),
         total_price INT NOT NULL CHECK(total_price > 0),
         status VARCHAR(20) DEFAULT 'active' CHECK(status IN ('active', 'cancelled', 'returned'))
      )`);
};

export default initDb;
