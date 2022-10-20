'use strict'
const Database = use('Database')
const sanitize = require('sqlString')


class orderController {
  async index({view,request,response}){
    try {
//       let allorders = await Database.raw(`
//         SELECT
//     orders.id,
//     orders.title,
//     sku,
//     material,
//     qty,
//     orders.img_url,
//     size,
//     CONCAT(f_name, ' ', l_name) AS user,
//     brands.title AS brand
// FROM
//     orders
//         INNER JOIN
//     brands ON orders.brand_id = brands.id
//         INNER JOIN
//     users ON USERS.ID = orders.user_id
// ORDER BY id
// ;
//
//         `)
        let allorders = ''
        // return allorders
      return view.render('admin/orders/all', {allorders})
    }

    catch(error){
      // return response.redirect('back')
      console.log(error);

    }
  }
  async store({view,request,response}){
    try {
      const post = request.post()
      await Database.raw(`
        INSERT INTO orders (title,sku,img_url,material,description,brand_id,qty,size,user_id)
        Values(${sanitize.escape(post.title)},${sanitize.escape(post.sku)},${sanitize.escape(post.img_url)},${sanitize.escape(post.material)},${sanitize.escape(post.description)},
          ${sanitize.escape(post.brand_id)},${sanitize.escape(post.qty)},${sanitize.escape(post.size)},1)
        `)
        return response.redirect('/admin/orders')
    }

    catch(error){
      // console.log(error);
      return response.redirect('back')

    }
  }
  async create({view,request,response}){
    let brandss = await Database.raw(`
    SELECT *
    FROM brands
;    `)
brandss = brandss[0]
      return view.render('admin/orders/create',{brandss})
  }

  async show({view,request,response,params}){
    try {
      let orders = await Database.raw(`
        SELECT
    orders.id,
    orders.title,
    sku,
    material,
    qty,
    orders.img_url,
    orders.brand_id,
    orders.description,
    size,
    CONCAT(f_name, ' ', l_name) AS user,
    brands.title AS brand
FROM
    orders
        INNER JOIN
    brands ON orders.brand_id = brands.id
        INNER JOIN
    users ON USERS.ID = orders.user_id
    WHERE orders.id = ${params.id}
;    `)
        orders = orders[0][0]
        // return orders
      return view.render('admin/orders/show', {orders})
    }

    catch(error){
      return response.redirect('back')

    }
  }
  async edit({view,request,response,params}){
    try {
      let orders = await Database.raw(`
        SELECT
    orders.id,
    orders.title,
    sku,
    material,
    qty,
    orders.img_url,
    orders.description,
    orders.brand_id,
    size,
    CONCAT(f_name, ' ', l_name) AS user,
    brands.title AS brand
FROM
    orders
        INNER JOIN
    brands ON orders.brand_id = brands.id
        INNER JOIN
    users ON USERS.ID = orders.user_id
    WHERE orders.id = ${params.id}
;    `)
        orders = orders[0][0]
        // return orders

        let brandss = await Database.raw(`
        SELECT *
        FROM brands
  ;    `)
  brandss = brandss[0]
      // return brandss
      return view.render('admin/orders/edit', {orders,brandss} )
    }

    catch(error){
      console.log(error);
      return response.redirect('back')
    }
  }

  async update({request,response,params}){

    try {
      var id = params.id
      const post = request.post()
      await Database.raw(`
        UPDATE orders
        SET title = ${sanitize.escape(post.title)},
        sku = ${sanitize.escape(post.sku)},
        img_url=${sanitize.escape(post.img_url)},
        material=${sanitize.escape(post.material)},
        description=${sanitize.escape(post.description)},
          brand_id=${sanitize.escape(post.brand_id)},
          qty = ${sanitize.escape(post.qty)},
          size = ${sanitize.escape(post.size)},
          user_id = 1
        WHERE orderS.ID = ${id}
        `)
        return response.redirect('/admin/orders')
    }

    catch(error){
      return response.redirect('back')

    }

  }
  async delete({view,request,response,params}){
    try {
      var id = params.id
      const post = request.post()
      await Database.raw(`
        DELETE FROM orders
        WHERE orderS.ID = ${id}
        `)
        return response.redirect('/admin/orders')
    }

    catch(error){
      return response.redirect('back')

    }
  }
}

module.exports = orderController
