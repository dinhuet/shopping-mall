// src/pages/EmployeeManagement.jsx
import React from 'react';

function EmployeeManagement() {
  const employees = [
    { name: 'Phạm Tùng Lâm', email: '23020678@vnu.edu.vn' },
    { name: 'Nguyễn Quang Huy', email: '23020672@vnu.edu.vn' },
    { name: 'Đỗ Hải Đăng', email: '23021526@vnu.edu.vn' },
    { name: 'Trần Quang Đỉnh', email: '23020043@vnu.edu.vn' },
    { name: 'Lê Kim Thành', email: '23020154@vnu.edu.vn' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        👨‍💼 Quản lý Nhân viên
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <span className="text-3xl">👔</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{employee.name}</h3>
            <p className="text-gray-600 text-sm">{employee.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeManagement;
