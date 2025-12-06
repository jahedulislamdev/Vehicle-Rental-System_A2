import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const register = async (payload: Record<string, unknown>) => {
    const { name, email, phone, password, role } = payload;
    const hashedPass = await bcrypt.hash(password as string, 10);
    const result = await pool.query(
        `INSERT INTO users(name,email,phone,password,role) VALUES($1, $2, $3, $4, COALESCE($5, 'customer')) RETURNING *`,
        [name, email, phone, hashedPass, role],
    );
    return result;
};

const login = async (email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ]);
    console.log(result.rows);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const matchedPass = bcrypt.compare(password, user?.password);
    if (!matchedPass) {
        return false;
    }
    const token = jwt.sign(
        { email: user.email, role: user.role },
        config.jwtSecret as string,
        { expiresIn: "1d" },
    );
    return { token, user };
};
export const authServices = {
    register,
    login,
};
