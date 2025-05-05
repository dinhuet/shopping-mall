import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import CSS cho slick-carousel
import 'slick-carousel/slick/slick.css';       // Thêm CSS chính của Slick Carousel
import 'slick-carousel/slick/slick-theme.css'; // Thêm CSS theme của Slick Carousel

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Nếu bạn muốn đo lường hiệu suất trong ứng dụng, hãy truyền một hàm
// để ghi lại kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một điểm phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
