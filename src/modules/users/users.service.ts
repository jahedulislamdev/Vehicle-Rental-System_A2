import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getUser = async (id: string) => {
    const result = await pool.query(
        `SELECT id, name, email, phone, role FROM users WHERE id=$1`,
        [id],
    );
    return result;
};
const getUsers = async () => {
    const result = await pool.query(
        `SELECT id, name, email, phone, role FROM users`,
    );
    return result;
};
const updateUser = async (
    payload: Record<string, unknown>,
    id: string,
    user: any,
) => {
    const { name, email, password, phone, role } = payload;
    if (password) {
        payload.password = await bcrypt.hash(password as string, 10);
    }
    if (user.role !== "admin") {
        if (user.userId !== Number(id)) {
            throw new Error("You are not allowed to update others profile");
        }
        const result = await pool.query(
            `UPDATE users SET name=COALESCE($1, name), email=COALESCE($2, email), password=COALESCE($3, password), phone=COALESCE($4, phone) WHERE id=$5 RETURNING id,name,email,phone,role`,
            [name, email, password, phone, id],
        );
        return result;
    }
    const result = await pool.query(
        `UPDATE users SET name=COALESCE($1, name), email=COALESCE($2, email), password=COALESCE($3, password), phone=COALESCE($4, phone), role=COALESCE($5, role) WHERE id=$6 RETURNING id,name,email,phone,role`,
        [name, email, password, phone, role, id],
    );
    return result;
};
const deleteUser = async (id: string) => {
    const userWithActiveBookings = await pool.query(
        `SELECT id,status FROM bookings WHERE customer_id=$1 AND status='active'`,
        [id],
    );
    if (userWithActiveBookings.rows.length) {
        return false;
    }
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result;
};

export const userServices = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};
