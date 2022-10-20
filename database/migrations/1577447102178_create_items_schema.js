'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateItemsSchema extends Schema {
  up () {
    this.raw(
      `CREATE TABLE items(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  sku VARCHAR(60) NOT NULL,
  material VARCHAR(60) NOT NULL,
  description TEXT NOT NULL,
  brand_id INT unsigned,
  qty INT UNSIGNED,
  size FLOAT UNSIGNED,
  order_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (order_id) REFERENCES orders(id)
)
`)
  }

  down () {
    this.raw(`
        DROP TABLE items
      `)
  }
}

module.exports = CreateItemsSchema
