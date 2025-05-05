const Product = require('../models/Product');
const productService = require('../../services/ProductService');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class ProductController {
    

    /**
     * Get list of products.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getListproduct(req, res, next) {
        productService
            .getAllProduct()
            .then((products) => {
                res.json(muiltipleMongooseToObject(products));
            })
            .catch(next);
    }

    /**
     * Get product detail by id.
     * @param {*} req - Lấy id từ params.
     * @param {*} res
     * @param {*} next
     */
    getProductDetail(req, res, next) {
        productService
            .getProductById(req.params.id)
            .then((product) => {
                if (!product)
                    return res
                        .status(404)
                        .json({ message: 'Product not found' });
                return res.json(mongooseToObject(product));
            })
            .catch(next);
    }

    /**
     * Create new product.
     * @param {*} req - Truyền vào req.body thông tin khởi tạo { name, price, countInStock, type, description, image, rating }
     * @param {*} res
     * @param {*} next
     */
    createProduct(req, res, next) {
        const { name, price, description, countInStock, type, image } = req.body;

        if (!name || !price || !description || !countInStock || !type || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
        }
    
        productService
          .createProduct(req.body)
          .then((product) => {
            if (product.status === 'OK') {
              return res.status(201).json(product);
            }
            return res.status(product.status).json(product.message);
          })
          .catch(next);
    }          

    // update product by id
    /**
     * update product by id.
     * @param {*} req - Truyền vào req.body thông tin mới.
     * @param {*} res
     * @param {*} next
     */
    updateProduct(req, res, next) {
        productService
            .updateProduct(req.params.id, req.body)
            .then((product) => {
                if (product.status === 'OK') {
                    return res.status(200).json(product);
                }
                return res.status(product.status).json(product.message);
            })
            .catch(next);
    }

    /**
     * delete product by id.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    deleteProduct(req, res, next) {
        const productId = req.params.id;
    
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
    
        productService
            .deleteProduct(productId)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res.status(result.status).json({ message: result.message });
            })
            .catch(next);
    }
    

    /**
     * Get menu items (list of products).
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getMenuItems(req, res, next) {
        productService
            .getAllProduct()
            .then((products) => {
                res.json(muiltipleMongooseToObject(products));
            })
            .catch(next);
    }

    /**
     * Create new menu item.
     * @param {*} req - Truyền vào req.body thông tin khởi tạo { name, price, countInStock, type, description, image, rating }
     * @param {*} res
     * @param {*} next
     */
    createMenuItem(req, res, next) {
        console.log('[CREATE MENU] User Object:', req.user); // Debug thông tin người dùng
    
        const { name, price, description } = req.body;
    
        // Kiểm tra các trường bắt buộc
        if (!name || !price || !description) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
    
        productService.createProduct(req.body)
          .then((product) => {
            console.log('[CREATE SUCCESS]', product);
    
            // Gửi lại danh sách sản phẩm sau khi thêm mới
            productService.getAllProduct().then((products) => {
              res.status(201).json({ newProduct: product, products: muiltipleMongooseToObject(products) });
            }).catch(next);
          })
          .catch(error => {
            console.error('[CREATE ERROR]', error);
            next(error);
          });
    }            
}

module.exports = new ProductController();