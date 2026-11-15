const productService = require('../services/product')

exports.add = async (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const stock = req.body.stock;
    const price = req.body.price;

    if (!name || typeof name != "string") {
        res.status(500).json({
            success: false,
            message: 'name is required!'
        });
        return;
    }

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

