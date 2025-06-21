// Support.jsx
import React from 'react';
import './Support.css'; // nếu bạn có CSS riêng cho trang này

function Support() {
    return (
        <div className="support-container">
            <h1>🛟 Hỗ trợ khách hàng</h1>
            <p>
                Nếu bạn cần trợ giúp, đừng ngần ngại liên hệ với chúng tôi qua
                các kênh sau:
            </p>

            <ul>
                <li>
                    📞 <strong>Hotline:</strong> 0392656916
                </li>
                <li>
                    📧 <strong>Email:</strong> tunglamp227@gmail.com
                </li>
                <li>
                    💬 <strong>Facebook:</strong>{' '}
                    <a
                        href="https://www.facebook.com/lam.phamtung.7731"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Phạm Tùng Lâm
                    </a>
                </li>
                <li>
                    📸 <strong>Instagram:</strong>{' '}
                    <a
                        href="https://www.instagram.com/tunglamp227/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @tunglamp227
                    </a>
                </li>
            </ul>

            <p>⏰ Giờ làm việc: 8:00 - 22:00 (T2 - CN)</p>

            <p>
                🎯 Hoặc bạn có thể xem mục{' '}
                <strong>Câu hỏi thường gặp (FAQ)</strong> bên dưới:
            </p>
            <details>
                <summary>🔄 Làm thế nào để đổi trả sản phẩm?</summary>
                <p>
                    Trong vòng 7 ngày kể từ khi nhận hàng, bạn có thể yêu cầu
                    đổi/trả sản phẩm không đúng mô tả hoặc bị lỗi.
                </p>
            </details>
            <details>
                <summary>🚚 Tôi có thể theo dõi đơn hàng như thế nào?</summary>
                <p>
                    Bạn sẽ nhận được mã vận đơn sau khi đặt hàng, và có thể tra
                    cứu tại website của đơn vị vận chuyển.
                </p>
            </details>
            <details>
                <summary>💳 Các phương thức thanh toán được chấp nhận?</summary>
                <p>
                    Chúng tôi hỗ trợ thanh toán bằng tiền mặt, chuyển khoản,
                    Momo, và các loại thẻ ngân hàng nội địa.
                </p>
            </details>
        </div>
    );
}

export default Support;
