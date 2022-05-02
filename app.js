const express = require('express')
const app = express()

// ruta raiz para probar el proyecto
app.get('/', (req,res) => {
  res.send('Hola API!')
})

// se levanta el proyecto en el puerto 3000
app.listen(3000 , () => {
  console.log('server on por http://localhost:3000')
})

// se define el encoded para poder ver las uris con el postman o parecido 
app.use(express.urlencoded( {extended:true}))
app.use(express.json())



// requerimientos de modelos
const modelCategories = require('./models').Categories
const modelProducts = require('./models').Products

// ---------------- rutas de categorias

// crear categoria
app.post('/crear-c',(req,res) => {
  modelCategories.create( req.body )
  .then( (data) => {
    res.json( {datos:data} )
  })
  .catch( (error) => {
    res.json( {error:error} )
  })
})
/*
EJEMPLO: en idCategoria hay que poner la categoria a la que corresponda
POST /crear-c {"name":"NOMBRE-CATEGORIA", "idCategoria": 1}
*/
// borrar categoria
app.delete('/borrar-c/:id',(req,res)=>{
  modelCategories.destroy({
    where: {id: req.params.id}
  })
    .then( (data) => {
      res.json( {datos:data} )
    })
    .catch( (error) => {
      res.json( {error:error} )
    })
})
/*
EJEMPLO: el id es la categoria que se quiera eliminar, no nesecita datos solo el id
DELETE /borrar-c/2 
*/
// actualizar categoria
app.put('/editar-c/:id',(req,res) => {
  modelCategories.update( req.body ,{
    where: {id: req.params.id}
  })
  .then( (data) => {
    res.json( {datos:data} )
  })
  .catch( (error) => {
    res.json( {error:error} )
  })
})
/*
EJEMPLO: el id es la categoria a editar y hay que pasarle los datos a editar, put no nesecita todos los datos solo los datos que van a ser modificados, en este caso solo se le cambio el nombre
PUT /editar-c/2 {"name":"NOMBRE-CATEGORIA"}
*/
// listar categorias
app.get('/listar-c',(req,res) => {
  modelCategories.findAll()
  .then( (data) => {
    res.json( {datos:data} )
  })
  .catch( (error) => {
    res.json( {error:error} )
  })
})
/*
EJEMPLO: solo hay que acceder a la uri y listo
GET /listar-c
*/



// ------------- rutas de productos



// crear producto
app.post('/crear-p',(req,res) => {
  modelProducts.create( req.body )
  .then( (data) => {
    res.json( {datos:data} )
  })
  .catch( (error) => {
    res.json( {error:error} )
  })
})
/*
EJEMPLO: el id categoria tiene que ser la categoria a la que corresponde
POST /crear-p {"name":"NOMBRE-PRODUCTO", "idCategoria": 2}
*/

// borrar producto
app.delete('/borrar-p/:id',(req,res)=>{
  modelProducts.destroy({
    where: {id: req.params.id}
  })
    .then( (data) => {
      res.json( {datos:data} )
    })
    .catch( (error) => {
      res.json( {error:error} )
    })
})
/*
EJEMPLO: solo se nesecita el id del producto a eliminar
DELETE /borrar-p/3
*/

// actualizar producto
app.put('/editar-p/:id',(req,res) => {
  modelProducts.update( req.body ,{
    where: {id: req.params.id}
  })
  .then( (data) => {
    res.json( {datos:data} )
  })
  .catch( (error) => {
    res.json( {error:error} )
  })
})
/*
EJEMPLO: para editar solo se nesecita el dato a ser editado
PUT /editar-p/3 {"name":"NOMBRE-PRODUCTO"}
*/
 
// listar productos
app.get('/listar-p',(req,res) => {
  modelProducts.findAll( {
    //include: [({model:modelCategories})]
  })// el include lee el id del producto envez de leer el id de idCategoria
  .then( (data) => {
    res.json( {datos:data})
  })
  .catch( (error) => {
    res.json( {error:error})
  })
})
/*
EJEMPLO: solo se nesecita ingresar a la ruta
GET /listar-p
*/