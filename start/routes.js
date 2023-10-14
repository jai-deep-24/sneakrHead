'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// start/routes.js
const Route = use('Route')

Route.group(() => {
  Route.get('/admin/products', 'ProductController.index')
  Route.get('/admin/products/create', 'ProductController.create')
  Route.post('/admin/products', 'ProductController.store')
  Route.get('/admin/products/:id', 'ProductController.show')
  Route.get('/admin/products/:id/edit', 'ProductController.edit')
  Route.put('/admin/products/:id', 'ProductController.update')
  Route.delete('/admin/products/:id', 'ProductController.delete')
}).prefix('admin')
