const bcrypt = require("bcrypt");
const prisma = require("../config/database");

class UserService {
  constructor(details) {
    this.details = details;
  }
  static async getUserByEmail(email) {
    const user = await prisma.user.findUnique({ where: { "email": email } });
    return user;
  }
  async createUser(userDetails = this.details) {
    const user = await prisma.user.create({
      data: {
        name: userDetails.name,
        email: userDetails.email,
        password: bcrypt.hashSync(userDetails.password.toString(), 4),
      },
    });
    return { user, message: "Account created Successfully!" };
  };
}
module.exports = UserService;