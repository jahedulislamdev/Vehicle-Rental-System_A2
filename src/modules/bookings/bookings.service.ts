import { pool } from "../../config/db";

const saveBookings = async (payload: Record<string, unknown>) => {
    console.log(payload);

    const { customer_id, vehicle_id, rent_start_date, rent_end_date, status } =
        payload;

    const vehicleInfo = await pool.query(
        `SELECT vehicle_name,daily_rent_price FROM vehicles WHERE id=$1`,
        [vehicle_id],
    );
    const vehicle = vehicleInfo.rows[0];
    // console.log(vehicle);

    const rentStartDate = new Date(rent_start_date as string);
    const rentEndDate = new Date(rent_end_date as string);
    const totalRentDay = Math.ceil(
        (rentEndDate.getTime() - rentStartDate.getTime()) /
            (1000 * 60 * 60 * 24),
    );
    // console.log(totalRentDay);

    const totalRentPrice = totalRentDay * vehicle?.daily_rent_price;

    const result = await pool.query(
        `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5, COALESCE($6, 'active')) RETURNING *`,
        [
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            totalRentPrice,
            status,
        ],
    );
    result.rows[0].vehicles = {
        vehicle_name: vehicle.vehicle_name,
        daily_rent_price: vehicle.daily_rent_price,
    };
    return result;
};

export const bookingServices = {
    saveBookings,
};
