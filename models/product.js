'use strict';

const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {}
  );
  products.associate = function (models) {
    // associations can be defined here
  };

  sequelizePaginate.paginate(products);

  return products;
};