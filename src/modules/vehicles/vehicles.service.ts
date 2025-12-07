import { pool } from "../../config/db";

const saveVehicle = async (payload: Record<string, unknown>) => {
    const {
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    } = payload;
    const result = await pool.query(
        `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4, COALESCE($5, 'available')) RETURNING *`,
        [
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status,
        ],
    );
    return result;
};
const getVehicle = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
    return result;
};
const getVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
};
const updateVehicle = async (payload: Record<string, unknown>, id: string) => {
    const {
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    } = payload;
    const result = await pool.query(
        `UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 WHERE id=$6 RETURNING *`,
        [
            vehicle_name,
            type,
            registration_number,
            daily_rent_price,
            availability_status,
            id,
        ],
    );
    return result;
};
const deleteVehicle = async (id: string) => {
    const vehicleStatus = await pool.query(
        `SELECT availability_status FROM vehicles WHERE id=$1`,
        [id],
    );
    if (vehicleStatus.rows[0].availability_status === "booked") {
        return false;
    }
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
    return result;
};
export const vehicleServices = {
    saveVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
};
