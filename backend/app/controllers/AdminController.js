const adminService = require('../../services/AdminService'); // Dùng AdminService

class AdminController {
  async login(req, res) {
    try {
      const result = await adminService.loginAdmin(req.body);

      if (result.status === 'OK') {
        return res.status(200).json(result);
      } else {
        return res.status(result.status).json({ message: result.message });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AdminController();
