import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function FeaturedProducts() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axiosClient.get('/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sản phẩm nổi bật:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const settings = {
    dots: true,
    infinite: menuItems.length > 5,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✨ Sản phẩm nổi bật</h2>
      <Slider {...settings}>
        {menuItems.map((item) => (
          <div key={item._id} className="p-2">
            <div className="border rounded-lg p-2 shadow hover:shadow-lg transition text-center">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="text-sm font-bold">{item.name}</h3>
              <p className="text-green-600 font-semibold">{item.price}₫</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeaturedProducts;
