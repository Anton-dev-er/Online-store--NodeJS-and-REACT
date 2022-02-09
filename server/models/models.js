const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true,},
  password: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketItem = sequelize.define('basket_item', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Good = sequelize.define('good', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING, unique: true, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  is_published: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  photo: {type: DataTypes.STRING, allowNull: false},
})

const Brand = sequelize.define('brand', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, unique: true, allowNull: false},
  photo: {type: DataTypes.STRING, allowNull: true},
})


const GoodInfo = sequelize.define('good_info', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
})

const Gender = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  photo: {type: DataTypes.STRING, allowNull: false},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketItem)
BasketItem.belongsTo(Basket)

BasketItem.hasOne(Good)
Good.belongsTo(BasketItem)

Brand.hasMany(Good)
Good.belongsTo(Basket)

Good.hasMany(GoodInfo)
GoodInfo.belongsTo(Good)

Category.hasMany(Good)
Good.belongsTo(Category)

Gender.hasMany(Category)
Category.belongsTo(Gender)

module.exports = {
  User,
  Basket,
  BasketItem,
  Good,
  Brand,
  GoodInfo,
  Category,
  Gender,
}




