'use strict'
const Database = use('Database')
const sanitize = require('sqlString')


class ProductController {
  async index({view,request,response}){
    try {
      let allProducts = await Database.raw(`
        SELECT
    products.id,
    products.title,
    sku,
    material,
    qty,
    products.img_url,
    size,
    CONCAT(f_name, ' ', l_name) AS user,
    brands.title AS brand
FROM
    products
        INNER JOIN
    brands ON products.brand_id = brands.id
        INNER JOIN
    users ON USERS.ID = products.user_id
ORDER BY id
;

        `)
        allProducts = allProducts[0]
        // return allProducts
      return view.render('admin/products/all', {allProducts})
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
        INSERT INTO products (title,sku,img_url,material,description,brand_id,qty,size,user_id)
        Values(${sanitize.escape(post.title)},${sanitize.escape(post.sku)},${sanitize.escape(post.img_url)},${sanitize.escape(post.material)},${sanitize.escape(post.description)},
          ${sanitize.escape(post.brand_id)},${sanitize.escape(post.qty)},${sanitize.escape(post.size)},1)
        `)
        return response.redirect('/admin/products')
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
      return view.render('admin/products/create',{brandss})
  }

  async show({view,request,response,params}){
    try {
      let products = await Database.raw(`
        SELECT
    products.id,
    products.title,
    sku,
    material,
    qty,
    products.img_url,
    products.brand_id,
    products.description,
    size,
    CONCAT(f_name, ' ', l_name) AS user,
    brands.title AS brand
FROM
    products
        INNER JOIN
    brands ON products.brand_id = brands.id
        INNER JOIN
    users ON USERS.ID = products.user_id
    WHERE products.id = ${params.id}
;    `)
        products = products[0][0]
        // return products
      return view.render('admin/products/show', {products})
    }

    catch(error){
      return response.redirect('back')

    }
  }
  async edit({view,request,response,params}){
    try {
      let products = await Database.raw(`
        SELECT
    products.id,
    products.title,
    sku,
    material,
    qty,
    products.img_url,
    products.description,
    products.brand_id,
    size,
    CONCAT(f_name, ' ', l_name) AS user,
    brands.title AS brand
FROM
    products
        INNER JOIN
    brands ON products.brand_id = brands.id
        INNER JOIN
    users ON USERS.ID = products.user_id
    WHERE products.id = ${params.id}
;    `)
        products = products[0][0]
        // return products

        let brandss = await Database.raw(`
        SELECT *
        FROM brands
  ;    `)
  brandss = brandss[0]
      // return brandss
      return view.render('admin/products/edit', {products,brandss} )
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
        UPDATE products
        SET title = ${sanitize.escape(post.title)},
        sku = ${sanitize.escape(post.sku)},
        img_url=${sanitize.escape(post.img_url)},
        material=${sanitize.escape(post.material)},
        description=${sanitize.escape(post.description)},
          brand_id=${sanitize.escape(post.brand_id)},
          qty = ${sanitize.escape(post.qty)},
          size = ${sanitize.escape(post.size)},
          user_id = 1
        WHERE PRODUCTS.ID = ${id}
        `)
        return response.redirect('/admin/products')
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
        DELETE FROM products
        WHERE PRODUCTS.ID = ${id}
        `)
        return response.redirect('/admin/products')
    }

    catch(error){
      return response.redirect('back')

    }
  }
}

module.exports = ProductController
