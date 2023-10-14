// app/Models/Product.js
'use strict'

const Model = use('Model')

class Product extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }

  brand() {
    return this.belongsTo('App/Models/Brand')
  }
}

module.exports = Product
