import { pool } from "../../config/db";

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
const updateUser = async (payload: Record<string, unknown>, id: string) => {
    const { name, email, password, phone, role } = payload;
    const result = await pool.query(
        `UPDATE users SET name=COALESCE($1, name), email=COALESCE($2, email), password=COALESCE($3, password), phone=COALESCE($4, phone), role=COALESCE($5, role) WHERE id=$6 RETURNING name,email,phone,role`,
        [name, email, password, phone, role, id],
    );
    return result;
};
const deleteUser = async (id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result;
};

export const userServices = {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
};
