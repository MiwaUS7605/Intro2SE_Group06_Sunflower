const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const shopRepo = require('./ShopRepository');
const authService = require('../auth/AuthService');

const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

const ajv = new Ajv();
addFormats(ajv);

class ShopController {    
    async details(req, res, next) {
        const shopId = req.params['shopId'];
        console.log('shopId', shopId);
        const shop = await shopRepo.get(shopId);
        console.log('shop', shop);
        if (!shop) return next(createError(404));

        let products = [];
        products = await shopRepo.getSer(shopId);
        if (!products) return next(createError(404));

        let ratings = [];
        ratings = await shopRepo.getrating(shopId);
        const countResult = Object.keys(ratings).length;
        
        res.render('users/shop-details', { shop, ratings, products, countResult});
    }

    async ratingshop(req, res, next) {
        try{ 
            let defaultrate = 0;
            const { rate, message, idshop } = req.body;
            
            defaultrate = rate? rate:defaultrate;
            console.log('ratings', defaultrate, message, idshop);

            if (!message){
                res.redirect(`/users/shops/${idshop}`);
                return;
            }
            let email = res.locals.user.email;
            if (!email) return;
            
            const iduser = await authService.getUserIdByEmail(email);
            await shopRepo.rating(defaultrate,message,idshop,iduser['idaccount']);
            console.log(iduser);
            
            res.redirect(`/users/shops/${idshop}`);
        }catch(e){
            console.log(e.message);
            return;
        }
    }
}

module.exports = new ShopController;