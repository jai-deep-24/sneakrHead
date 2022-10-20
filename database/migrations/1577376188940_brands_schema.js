'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrandsSchema extends Schema {
  up () {
    this.raw(
      `CREATE TABLE brands(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`)
  }

  down () {
    this.raw(
      `DROP TABLE brands`
    )
  }
}

module.exports = BrandsSchema
