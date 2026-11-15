const models = require('../models');
const { Op } = require('sequelize');

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

exports.get = async (page = 1, limit = 10, keyword = "") => {
    try {
        let bodyPage = page || 1;

        const options = {
            attributes: {
                exclude: ['updatedAt']
            },
            page: bodyPage,
            paginate: limit,
            order: [['createdAt', 'DESC']],
        }

        if (keyword) {
            options.where = { name: { [Op.like]: "%" + keyword + "%" } }
        }

        const { docs, pages, total } = await Product.paginate(options)

        return {
            success: true,
            message: 'Get product data successfully.',
            data: {
                data: docs,
                last_page: pages,
                total_data: total
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Get product data failed: ' + error?.message,
            data: {
                data: docs,
                last_page: pages,
                total_data: total
            }
        }
    }
};

exports.update = async (id, name, desc, stock, price) => {
    return Product.update({
        name: name,
        desc: desc,
        stock: stock,
        price: price,
    }, { where: { id: id } })
        .then((data) => {
            if (data) {
                return Product.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['updatedAt', 'createdAt'],
                    }
                }).then(data => {
                    if (data) {
                        return {
                            data: data,
                            success: true,
                            message: 'Update product successfully.',
                        };
                    } else {
                        return {
                            data: null,
                            success: false,
                            message: 'Update product failed!'
                        };
                    }
                })
            } else {
                return {
                    data: null,
                    success: false,
                    message: 'Update product failed!'
                };
            }
        })
        .catch((error) => {
            return {
                data: null,
                success: false,
                message: 'Update product failed: ' + error?.message
            };
        });
};

exports.delete = async (id) => {
    return Product.findOne({ where: { id: id } }).then(ress => {
        if (!ress) {
            return {
                data: null,
                success: false,
                message: 'Product not found!',
            }
        } else {
            return Product.destroy({ where: { id: id } }).then(ress => {
                if (ress) {
                    return {
                        data: null,
                        success: true,
                        message: 'Product deleted.',
                    }
                } else {
                    return {
                        data: null,
                        success: false,
                        message: 'Failed to delete product!',
                    }
                }
            })
        }
    })
}