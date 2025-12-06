import { pool } from "../../config/db";

const saveBookings = async (payload: Record<string, unknown>) => {
    const {
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        total_price,
        status,
    } = payload;

    const vehicleInfo = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
        vehicle_id,
    ]);
    if (vehicleInfo.rows.length === 0) {
        console.log("vehicle not found");
    }
    console.log(vehicleInfo.rows[0]);

    const customerInfo = await pool.query(`SELECT * FROM users WHERE id=$1`, [
        customer_id,
    ]);
    if (customerInfo.rows.length === 0) {
        console.log("customer not found");
    }
    console.log(customerInfo.rows[0]);

    const result = await pool.query(
        `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        [
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            total_price,
            status,
        ],
    );
    return result;
    //  const bookingInfo = result.rows[0];
};

export const bookingServices = {
    saveBookings,
};
