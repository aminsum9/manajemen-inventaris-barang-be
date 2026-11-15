'use strict';

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

  return products;
};