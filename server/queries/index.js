import {pool} from "../db/index.js";

export const getAllUsers = async () => {
   const users = await pool.query('SELECT * FROM users')
    return users.rows
}
export const getUserById = async (id) => {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return user.rows
}