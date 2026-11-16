const productService = require('../services/product')

exports.add = async (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const stock = req.body.stock;
    const price = req.body.price;

    const ress = await productService.add(name,desc,stock,price)

    if(ress.success){
        res.status(200).send({
            success: true,
            message: ress?.message,
            data: ress?.data,
        });
    } else {
         res.status(400).send({
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
        res.status(200).send({
            success: true,
            message: ress?.message,
            data: ress?.data,
        });
    } else {
         res.status(400).send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    
    const name = req.body.name;
    const desc = req.body.desc;
    const stock = req.body.stock;
    const price = req.body.price;

    const ress = await productService.update(id,name,desc,stock,price)

    if(ress.success){
        res.status(200).send({
            success: true,
            message: ress?.message,
            data: ress?.data,
        });
    } else {
         res.status(400).send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    const ress = await productService.delete(id)

    if(ress.success){
        res.status(200).send({
            success: true,
            message: ress?.message,
            data: ress?.data,
        });
    } else {
         res.status(400).send({
            success: false,
            message: ress?.message,
            data: null,
        });
    }
};

