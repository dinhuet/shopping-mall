import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productAPI from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import './Product.css'; // Import CSS for styling

function Product() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialType = queryParams.get('type') || 'both'; // Lấy giá trị type từ query params, mặc định là 'both'
    const [type, setType] = useState(initialType);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productAPI.getAll(type); // Gọi API với type
                // Giả sử response có dạng { data: [...] }
                setProducts(response.data);
            } catch (error) {
                setError('Không thể tải sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [type]);

    const handleFilterChange = (e) => {
        setType(e.target.value);
    };

    if (loading) return <p>Đang tải sản phẩm...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="product-page">
            <div className="mydict" onChange={handleFilterChange}>
                <div>
                    <label>
                        <input type="radio" name="radio" value="" />
                        <span>Both</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" value="men" />
                        <span>Men</span>
                    </label>
                    <label>
                        <input type="radio" name="radio" value="women" />
                        <span>Women</span>
                    </label>
                </div>
            </div>
            {/* Danh sách sản phẩm */}
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product._id || product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default Product;
