require('dotenv').config(); // 👈 Thêm dòng này ở đầu file nếu chưa có

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET; // 👈 Lấy từ .env

class AdminService {
  async loginAdmin({ email, password }) {
    const filePath = path.join(__dirname, '../config/db/admin.json');
    const rawData = fs.readFileSync(filePath);
    const adminList = JSON.parse(rawData);

    const admin = adminList.find(
      (user) => user.email === email && user.password === password
    );

    if (!admin) {
      return { status: 404, message: 'Admin not found' };
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );
    
    return {
      status: 'OK',
      message: 'Đăng nhập thành công',
      token,
      admin: { id: admin.id, email: admin.email }
    };    
  }
}

module.exports = new AdminService();
