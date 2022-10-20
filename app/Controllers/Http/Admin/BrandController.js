'use strict'
const Database = use('Database')
const sanitize = require('sqlString')


class BrandController {
  async index({view,request,response}){
    try {
      let allBrands = await Database.raw(`

          SELECT * FROM brands
          INNER JOIN users
          ON users.id = brands.user_id
        `)
        allBrands = allBrands[0]
        // return allBrands
      return view.render('admin/brands/all', {allBrands})
    }

    catch(error){
      return response.redirect('back')

    }
  }
  async store({view,request,response,params}){
    try {
      const post = request.post()
      await Database.raw(`
        INSERT INTO brands (title,img_url,user_id,description)
        VALUES(
          ${sanitize.escape(post.title)},${sanitize.escape(post.img_url)},4,${sanitize.escape(post.description)}
          )
        `)
        return response.redirect('/admin/brands')
    }

    catch(error){
      return response.redirect('back')
      console.log(error);

    }
  }
  create({view,request,response}){
      return view.render('admin/brands/create')
  }

  async show({view,request,response,params}){
    try {
      let brands = await Database.raw(`
        SELECT * FROM brands
        INNER JOIN users
        ON users.id = brands.user_id
    WHERE brands.user_id = ${params.id}
;    `)
        brands = brands[0][0]
        // return brands
      return view.render('admin/brands/show', {brands})
    }

    catch(error){
      return response.redirect('back')

    }
  }
  async edit({view,request,response,params}){
    try {
      let brands = await Database.raw(`
        SELECT * FROM brands
        INNER JOIN users
        ON users.id = brands.user_id
    WHERE brands.user_id = ${params.id}
;    `)
        brands = brands[0][0]
        // return brands
      return view.render('admin/brands/edit', {brands})
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
        UPDATE brands
        SET title = ${sanitize.escape(post.title)},
        img_url=${sanitize.escape(post.img_url)},
        description=${sanitize.escape(post.description)},
          user_id = ${id}
        WHERE brandS.user_ID = ${id}
        `)
        return response.redirect('/admin/brands')
    }

    catch(error){
      // return response.redirect('back')
      console.log(console.error);

    }

  }
  async delete({view,request,response,params}){
    try {
      var id = params.id
      const post = request.post()
      await Database.raw(`
        DELETE FROM brands
        WHERE brandS.user_id = ${id}
        `)
        return response.redirect('/admin/brands')
    }

    catch(error){
      return response.redirect('back')

    }
  }
}

module.exports = BrandController
