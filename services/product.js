const productRepository = require('../repositories/product');

exports.add = async (name, desc, stock, price) => {
    if(stock < 0){
        return {data: null, success: false, message: "Product stock cannot be negative!"}
    }

    const ress = await productRepository.add(name, desc, stock, price)

    return ress
}

exports.get = async (page,limit,keyword) => {
    const ress = await productRepository.get(page,limit,keyword)

    return ress
}

exports.delete = async (id) => {
    const ress = await productRepository.delete(id)

    return ress
}