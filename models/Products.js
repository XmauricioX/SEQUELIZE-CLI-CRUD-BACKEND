'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo( models.Categories,
      {
        foreignKey: 'id',
        target_Key: 'idCategoria'
      }
    )}
  }
  Products.init({
    name: DataTypes.STRING,
    idCategoria: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};
