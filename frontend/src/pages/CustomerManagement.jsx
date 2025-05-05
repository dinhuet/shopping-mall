import React, { useEffect, useState } from "react";
import userAPI from '../api/userAPI';
import './CustomerManagement.css'

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const profile = await userAPI.getProfile();
      if (!profile.data?.isAdmin) {
        alert("Chỉ có admin mới có quyền xem danh sách khách hàng.");
        return;
      }
  
      const res = await userAPI.getAllUsers();
      if (res.data) {
        setCustomers(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      if (error.response && error.response.status === 401) {
        alert("Bạn không có quyền truy cập danh sách khách hàng. Hãy đăng nhập với tài khoản admin.");
      }
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">👥 Quản lý Khách hàng</h2>
        <button
          onClick={fetchCustomers}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg shadow-md transition"
        >
          🔄 Tải lại
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
      ) : (
        <>
          {customers.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 text-lg">
              Không có khách hàng nào.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Tên</th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">SĐT</th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Vai trò</th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer._id} className="hover:bg-gray-50">
                        <td className="py-3 px-6 border-b">{customer.name}</td>
                        <td className="py-3 px-6 border-b">{customer.email}</td>
                        <td className="py-3 px-6 border-b">{customer.phone || "Chưa cập nhật"}</td>
                        <td className="py-3 px-6 border-b">{customer.isAdmin ? "Admin" : "User"}</td>
                        <td className="py-3 px-6 border-b">
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerManagement;
