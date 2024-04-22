import {pool} from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const {sign} = jwt;

export const getAllUsers = async () => {
    const users = await pool.query('SELECT * FROM users')
    return users.rows
}

export const getUserById = async (id) => {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return user.rows
}

export const register = async (body) => {
    const {email, password} = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await pool.query(
        "INSERT INTO users (email , password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
}

export const login = async (body) => {
    const {email, password} = body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    const user = result.rows[0];
    if (!user) {
        throw new Error("Email not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Password does not match !");
    }
    return sign({userId: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});
}