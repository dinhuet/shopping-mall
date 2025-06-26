const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const qs = require('qs');
const config = require('../../config/zalopay/index');
const orderService = require('../../services/OrderService');

class PaymentController {
    /**
 * methed: POST
 * Sandbox	POST	https://sb-openapi.zalopay.vn/v2/create
 * description: tạo đơn hàng, thanh toán
 */
    async payment(req, res) {
        try {
            if (!req.body.orderId) {
                return res.status(400).json({ error: 'Missing orderId in request body' });
              }

            const embed_data = {
                redirecturl: '', // chuyen ve trang thanh toan thanh cong
            };

           
            const orders = await orderService.getOrderByOrderId(req.body.orderId);
            const items = orders.orderItems;
            const amount = orders.totalPrice;
           // console.log(items);
           
            
            

            const transID = Math.floor(Math.random() * 1000000);
            const app_trans_id = `${moment().format('YYMMDD')}_${transID}`;

            const order = {
                app_id: config.app_id,
                app_trans_id,
                app_user: 'user123',
                app_time: Date.now(),
                item: JSON.stringify(items),
                embed_data: JSON.stringify(embed_data),
                amount: amount,
                callback_url: 'https://47a6-14-191-43-160.ngrok-free.app/payment/callback',
                description: `Payment for order #${transID}`,
                bank_code: '',
            };

            const dataString = [
                order.app_id,
                order.app_trans_id,
                order.app_user,
                order.amount,
                order.app_time,
                order.embed_data,
                order.item,
            ].join('|');

            order.mac = CryptoJS.HmacSHA256(dataString, config.key1).toString();

            const result = await axios.post(config.endpoint, null, { params: order });

            res.status(200).json(result.data);
        } catch (error) {
            console.error('ZaloPay Payment Error:', error);
            res.status(500).json({ error: 'Payment failed' });
        }
    }

    async callback(req, res) {
        let result = {};
        try {
            const dataStr = req.body.data;
            const reqMac = req.body.mac;

            const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

            if (reqMac !== mac) {
                result.return_code = -1;
                result.return_message = 'mac not equal';
            } else {
                const dataJson = JSON.parse(dataStr);
                console.log('Giao dịch thành công, app_trans_id =', dataJson.app_trans_id);
                // cập nhật trạng thái đơn hàng 
                await orderService.updateOrder(req.user.id, { isPaid: true });

                result.return_code = 1;
                result.return_message = 'success';
            }
        } catch (err) {
            console.error('Callback error:', err.message);
            result.return_code = 0;
            result.return_message = err.message;
        }

        res.json(result);
    }

    async checkStatusOrder(req, res) {
        const app_trans_id = req.params.app_trans_id;

        let postData = {
            app_id: config.app_id,
            app_trans_id,
        };

        let data = postData.app_id + '|' + postData.app_trans_id + '|' + config.key1;
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        let postConfig = {
            method: 'post',
            url: 'https://sb-openapi.zalopay.vn/v2/query',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(postData),
        };

        try {
            const result = await axios(postConfig);
            console.log(result.data);
            if (result.data.return_code === 1) {
                await orderService.updateOrder(req.user.id, { isPaid: true });

            }
            return res.status(200).json(result.data);
        } catch (error) {
            console.log('lỗi');
            console.log(error);
        }
    }


}

module.exports = new PaymentController();