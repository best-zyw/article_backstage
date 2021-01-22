'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Category.hasMany(models.Article);
      models.Category.hasMany(models.Category,{foreignKey:'parentId',as:'children'})
    }
  };
  Category.init({
    name: DataTypes.STRING,
    sort: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    url: DataTypes.STRING,
    content: DataTypes.STRING,
    show: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};