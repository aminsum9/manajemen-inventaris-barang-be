const models = require('../models');

const Product = models.products;

exports.add = (name, desc, stock, price) => {
    return Product.create({
        name,
        desc,
        stock,
        price
    }).then(ress => {
        return {
            data: {
                name: ress.name,
                desc: ress.desc,
                stock: ress.stock,
                price: ress.price
            },
            message: "create product successfully.",
            success: true
        }
    }).catch(error => {
        return {
            data: null,
            message: "create product failed: " + error.message,
            success: false
        }
    })
};