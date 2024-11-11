const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { USER } = require("../utils/constants");
const prisma = require("../config/database");

class AuthService {

    static async createToken(userData) {
        let payload = { id: userData.id };
        let accesses = [];
        const user = await prisma.user.findUnique({ where: { id: userData.id } });
        if (user) {
          accesses = [...accesses, USER];
        }

        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { algorithm: "HS256" });
    }

    static async authenticateByPassword(id, passwordInput) {
        const user = await prisma.user.findUnique({ where: { id } });
        const isPasswordValid = bcrypt.compareSync(passwordInput, user.password);
        return { isPasswordValid };
    }
}

module.exports = AuthService;