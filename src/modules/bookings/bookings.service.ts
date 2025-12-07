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
    console.log(totalRentDay);

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

const getBookings = async (user: any) => {
    // admin => all bookings with customer and vehicle info, (full access)
    // customer => customers individual bookings with vehicle info (individul)
    let bookings;
    if (user.role === "admin") {
        const result = await pool.query(`SELECT * FROM bookings`);
        bookings = result.rows;

        const detaildBookingInfo = [];
        for (const b of bookings) {
            const customerResult = await pool.query(
                `SELECT name,email FROM users WHERE id=$1`,
                [b.customer_id],
            );
            const vehicleResult = await pool.query(
                `SELECT vehicle_name,registration_number FROM vehicles WHERE id=$1`,
                [b.vehicle_id],
            );

            detaildBookingInfo.push({
                ...b,
                customer: customerResult.rows[0],
                vehicle: vehicleResult.rows[0],
            });
        }
        return detaildBookingInfo;
    } else {
        const result = await pool.query(
            `SELECT * FROM bookings WHERE customer_id=$1`,
            [user.id],
        );
        bookings = result.rows;
        const detailedBookingInfo = [];
        for (const b of bookings) {
            const vehicleResult = await pool.query(
                `SELECT vehicle_name,registration_number FROM vehicles WHERE id=$1`,
                [b.vehicle_id],
            );
            detailedBookingInfo.push({ ...b, vehicle: vehicleResult.rows[0] });
        }
        return detailedBookingInfo;
    }
};

const updateBookings = async (status: string, id: string) => {
    const result = await pool.query(
        `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
        [status, id],
    );
    return result;
};
const updateVehicleStatus = async (status = "available", id: string) => {
    const result = await pool.query(
        `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING availability_status`,
        [status, id],
    );
    return result;
};
export const bookingServices = {
    saveBookings,
    getBookings,
    updateBookings,
    updateVehicleStatus,
};
