'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnToBrandsSchema extends Schema {
  up () {
    this.raw(`
        ALTER TABLE brands
        ADD COLUMN img_url text after title
      `)
  }

  down () {
    this.raw(`
      ALTER TABLE brands
      DROP COLUMN img_url
      `)
  }
}

module.exports = AddColumnToBrandsSchema
