'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateOrdersSchema extends Schema {
  up () {
    this.raw(
      `CREATE TABLE orders(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        f_name VARCHAR(60) NOT NULL,
        l_name VARCHAR(60) NOT NULL,
        address TEXT NOT NULL ,
        address_2 TEXT ,
        city VARCHAR(20) NOT NULL ,
        state VARCHAR(40) NOT NULL,
        country VARCHAR(3) NOT NULL DEFAULT 'IND' ,
        payment_type VARCHAR(60) NOT NULL DEFAULT 'paypal',
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(id)
      )`)
  }

  down () {
    this.raw(`
        DROP TABLE orders
      `)
  }
}

module.exports = CreateOrdersSchema
