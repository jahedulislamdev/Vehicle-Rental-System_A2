import { pool } from "../../config/db";

const getUser = async (id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result;
};
const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
};
const updateUser = async (payload: Record<string, unknown>, id: string) => {
    const { name, email, password, phone, role } = payload;
    const result = await pool.query(
        `UPDATE users SET name=$1, email=$2, password=$3, phone=$4, role=$5 WHERE id=$6 RETURNING *`,
        [name, email, password, phone, role],
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
