const express = require('express');
const router = express.Router();
const userController = require('../components/users/UserController');
const serviceController = require('../components/services/ServiceController');
const cartController = require('../components/cart/CartController');
const checkoutController = require('../components/checkout/CheckoutController');
const shopController = require('../components/shop/ShopController');

/* GET home page. */

//router.get('/home', userController.home);

/* GET check out page. */
router.get('/checkout',checkoutController.displayCheckout);

/* GET contact page. */
router.get('/contact', userController.contact);

/* GET shop detail page. */
router.get('/shop-details', shopController.details);

/* GET service detail page. */
router.get('/service-details', serviceController.details);

/* GET shop grid page. */
router.get('/shop-grid', serviceController.list);

/* GET shopping cart page. */
router.get('/shopping-cart', cartController.displayCart);

router.get('/home', serviceController.featuredproducts);

router.post('/add-to-cart', cartController.addToCart);

router.post('/remove-from-cart', cartController.removeFromCart);

router.post('/increase-quantity', cartController.incrQuantity);
router.post('/decrease-quantity', cartController.descQuantity);

router.post('/place-order', checkoutController.placeOrder);

router.get('/manage-order', checkoutController.manageOrder);

module.exports = router;
