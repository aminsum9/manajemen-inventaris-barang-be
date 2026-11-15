const productService = require('../services/product')

exports.add = async (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const stock = req.body.stock;
    const price = req.body.price;

    const ress = await productService.add(name,desc,stock,price)

    if(ress.success){
        res.send({
            success: true,
            message: 'success',
            data: ress?.data,
        });
    } else {
         res.send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
};

exports.get = async (req, res) => {
    const { page,limit,keyword } = req.query;

    const ress = await productService.get(page,limit,keyword)

    if(ress.success){
        res.send({
            success: true,
            message: 'success',
            data: ress?.data,
        });
    } else {
         res.send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
};

