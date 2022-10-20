'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToProductsSchema extends Schema {
  up () {
    this.raw(`
        ALTER  TABLE products
        ADD COLUMN img_url TEXT AFTER sku
      `)
  }

  down () {
    this.raw(`
        ALTER TABLE products DROP COLUMN img_url
      `)
  }
}

module.exports = AddColumnToProductsSchema
