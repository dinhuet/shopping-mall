import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MenuPanel.css';

function MenuPanel() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    countInStock: '',
    type: '',
    image: ''
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axiosClient.get('/api/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Lỗi khi tải menu:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.description || !newItem.countInStock || !newItem.type || !newItem.image) {
      alert('Vui lòng điền đầy đủ thông tin sản phẩm!');
      return;
    }
    if (isNaN(newItem.price) || isNaN(newItem.countInStock)) {
      alert('Giá và số lượng phải là số hợp lệ!');
      return;
    }
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        alert('Vui lòng đăng nhập với tài khoản admin');
        return;
      }
      const response = await axiosClient.post('/api/menu', newItem, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      if (response.data.status === 'OK') {
        setNewItem({ name: '', price: '', description: '', countInStock: '', type: '', image: '' });
        fetchMenuItems();
        alert('Thêm sản phẩm thành công!');
      } else {
        alert('Lỗi: ' + response.data.message);
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error.response);
      alert(`Lỗi: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        alert('Vui lòng đăng nhập với tài khoản admin');
        return;
      }
      const response = await axiosClient.delete(`/api/menu/${id}`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      if (response.data.status === 'OK') {
        alert('Xoá sản phẩm thành công!');
        await fetchMenuItems();
      } else {
        alert('Lỗi: ' + response.data.message);
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error.response);
      alert(`Lỗi: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleUpdateItem = async (id) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      if (!adminToken) {
        alert('Vui lòng đăng nhập với tài khoản admin');
        return;
      }
      const response = await axiosClient.put(`/api/update/${id}`, editingItem, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      if (response.data.status === 'OK') {
        alert('Cập nhật sản phẩm thành công!');
        fetchMenuItems();
        setEditingItem(null);
      } else {
        alert('Lỗi: ' + response.data.message);
      }
    } catch (error) {
      console.error('Chi tiết lỗi:', error.response);
      alert(`Lỗi: ${error.response?.data?.message || error.message}`);
    }
  };

  const settings = {
    dots: true,
    infinite: menuItems.length > 1,  // Chỉ lặp lại khi có nhiều hơn 1 sản phẩm
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,  // Hiển thị 3 sản phẩm khi màn hình nhỏ hơn 1024px
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,  // Hiển thị 2 sản phẩm khi màn hình nhỏ hơn 768px
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,  // Hiển thị 1 sản phẩm khi màn hình nhỏ hơn 480px
          slidesToScroll: 1,
        }
      }
    ]
  };    

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📋 Quản lý Menu</h2>

      {/* Form thêm sản phẩm mới */}
      <div className="mb-6">
        {['name', 'price', 'description', 'countInStock', 'type', 'image'].map((field) => (
          <input
            key={field}
            type={field === 'price' || field === 'countInStock' ? 'number' : 'text'}
            name={field}
            placeholder={field === 'name' ? 'Tên sản phẩm' :
                        field === 'price' ? 'Giá' :
                        field === 'description' ? 'Mô tả' :
                        field === 'countInStock' ? 'Số lượng' :
                        field === 'type' ? 'Loại sản phẩm' : 'URL ảnh'}
            value={newItem[field]}
            onChange={handleInputChange}
            className="border p-2 mr-2 mb-2"
          />
        ))}
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Thêm
        </button>
      </div>

      <div className="mb-4">
      <input
        type="text"
        placeholder="🔍 Tìm kiếm theo tên sản phẩm..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="border p-2 w-full md:w-1/2"
      />
    </div>


      {/* Slider */}
      <Slider {...settings}>
      {filteredItems.map((item) => (
          <div key={item._id} className="p-2">
            <div 
              className="border rounded-lg p-2 shadow hover:shadow-lg transition text-center cursor-pointer"
              onClick={() => setSelectedItemId(selectedItemId === item._id ? null : item._id)}
            >
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded mb-2" />
              {editingItem && editingItem._id === item._id ? (
              <>
                {['name', 'price', 'description', 'countInStock', 'type', 'image'].map((field) => (
                  <input
                    key={field}
                    type={field === 'price' || field === 'countInStockSản phẩm nổi bật' ? 'number' : 'text'}
                    value={editingItem[field]}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, [field]: e.target.value })
                    }
                    className="border p-1 mb-1 w-full text-xs"
                    placeholder={
                      field === 'name' ? 'Tên sản phẩm' :
                      field === 'price' ? 'Giá' :
                      field === 'description' ? 'Mô tả' :
                      field === 'countInStock' ? 'Số lượng' :
                      field === 'type' ? 'Loại sản phẩm' :
                      'URL ảnh'
                    }
                  />
                ))}
                <div className="flex justify-center space-x-1 text-xs mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateItem(item._id);
                    }}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    💾 Lưu
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItem(null); // Hủy chỉnh sửa
                    }}
                    className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                  >
                    ❌ Hủy
                  </button>
                </div>
              </>
            ) : (
              <>
    {/* Hiển thị thông tin sản phẩm như cũ */}

                  <h3 className="text-sm font-bold mb-1">{item.name}</h3>
                  {selectedItemId === item._id && (
                    <>
                      <p className="text-green-600 font-semibold text-xs">{item.price}₫</p>
                      <p className="text-gray-600 text-xs mb-1">{item.description}</p>
                      <p className="text-gray-400 text-[10px]">Kho: {item.countInStock}</p>
                      <p className="text-gray-400 text-[10px] mb-2">Loại: {item.type}</p>
                    </>
                  )}
                  <div className="flex justify-center space-x-1 text-xs mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingItem(item);
                      }}
                      className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item._id);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MenuPanel;
