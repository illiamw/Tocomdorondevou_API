/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
// Rotas Unidades
Route.post('/unidadeDetalhes', 'UnidadesController.unidadeDetalhes')
Route.post('/unidadesProximasRef', 'UnidadesController.unidadesProximasRef')
// Rotas Formulario
Route.post('/registraResposta', 'FormulariosController.registraResposta')
Route.get('/formulariosTodos', 'FormulariosController.formulariosTodos')
// Rotas Email
Route.get('/relatorioGestor', 'RelatoriosController.relatorioGestor')



Route.get('/', () => {
  return 'Hello world'
})
