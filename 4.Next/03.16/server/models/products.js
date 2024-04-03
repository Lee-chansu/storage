'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    name: DataTypes.STRING,
    englishName: DataTypes.STRING,
    brand: DataTypes.STRING,
    productCode: DataTypes.STRING,
    price: DataTypes.INTEGER,
    salePrice: DataTypes.INTEGER,
    starRating: DataTypes.FLOAT,
    starRatingCount: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};