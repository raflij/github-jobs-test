require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const UserModel = require('../models/userModel');

class AuthController {
    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await UserModel.findOne({
                attributes: ['username', 'password'],
                where: { username }
            });

            if (!user) {
                return res.status(401).json({
                    status: '101',
                    message: 'Username atau password kamu salah',
                    data: null
                });
            }

            if (password != user.password) {
                return res.status(401).json({
                    status: '102',
                    message: 'Username atau password kamu salah',
                    data: null
                });
            }

            const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
            res.status(200).json({
                status: 0,
                message: 'Login berhasil',
                data: {
                    token: token
                }
            });
        } catch (error) {
            res.status(500).json({
                status: '103',
                message: 'Terjadi kesalahan',
                data: null
            });
        }
    }
}

module.exports = new AuthController();