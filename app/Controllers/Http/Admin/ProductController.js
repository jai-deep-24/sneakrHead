// app/Controllers/Http/ProductController.js
'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async index({ view }) {
    const allProducts = await Product.query()
      .with('user')
      .with('brand')
      .orderBy('id')
      .fetch()

    return view.render('admin/products/all', { allProducts: allProducts.toJSON() })
  }

  async create({ view }) {
    return view.render('admin/products/create')
  }

  async store({ request, response }) {
    const data = request.only([
      'title', 'sku', 'img_url', 'material', 'description', 'brand_id', 'qty', 'size', 'user_id'
    ])
    await Product.create(data)

    return response.redirect('/admin/products')
  }

  async show({ view, params }) {
    const product = await Product.query()
      .with('user')
      .with('brand')
      .where('id', params.id)
      .first()

    return view.render('admin/products/show', { product: product.toJSON() })
  }

  async edit({ view, params }) {
    const product = await Product.query()
      .with('user')
      .with('brand')
      .where('id', params.id)
      .first()

    return view.render('admin/products/edit', { product: product.toJSON() })
  }

  async update({ request, response, params }) {
    const product = await Product.find(params.id)
    const data = request.only([
      'title', 'sku', 'img_url', 'material', 'description', 'brand_id', 'qty', 'size', 'user_id'
    ])

    product.merge(data)
    await product.save()

    return response.redirect('/admin/products')
  }

  async delete({ response, params }) {
    const product = await Product.find(params.id)
    await product.delete()

    return response.redirect('/admin/products')
  }
}

module.exports = ProductController
