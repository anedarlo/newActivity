const express = require('express');
const router = express.Router();
const fs = require('fs')
const { sanitizar, sanitizarV } = require('../validaciones/validacion')
const articulo = require('../controladores/articulo_class')
const listado = require('../controladores/listado_class');

const articulos_json = fs.readFileSync('articulos.json', 'utf-8')
let articulos = JSON.parse(articulos_json)

let lista = new listado();

articulos.forEach(art => {
  lista.agregar(art)
})

console.log(lista,lista)

router.get('/', function(req, res) {
  res.send('Blog de Publicaciones');
})

router.get('/articulos', (req,res)=>{
  new Promise((resolve, reject) => {
    if(typeof lista.lista[0] !== 'undefined'){
      resolve( lista.mostrar(res) )
    }else{
      reject( res.status(400).send('No hay articulos para ver') )
    }
  });
})

router.post('/registrar', (req, res) => {
  req.session.admin = {
    rol: "Admin",
    usuario : req.body.usuario,
    password : req.body.password
  }
  res.status(200).redirect('/perfil')
})

router.get('/perfil', (req, res) => {
  if(req.session.admin.rol === 'Admin') {
    res.status(200).send('Administrador En Linea')
  } else {
    res.status(400).send('Eres un usuario común')
  }
})

router.get('/articulo/:titulo/:rol', (req,res)=>{
  if(req.params.rol === "Admin") {
    if(typeof lista.lista[0] !== 'undefined'){
      lista.buscar(req.params.titulo,res)
      articulos = lista.articulos
      let articulos_json = JSON.stringify(articulos)
      fs.writeFileSync('articulos.json', articulos_json, 'utf-8') 
    }else{
      res.send('No hay articulos para ver')
    }
  } else {
    res.status(400).send('Solo el administrador puede ver un articulo en especifico')
  }
})

router.post('/articulos/crear/:rol', sanitizar, (req, res)=>{
  if(req.params.rol === "Admin") {
    let crearArticulo = new articulo(req, res)
    lista.agregar(crearArticulo);
    articulos.push(crearArticulo)
    let articulos_json = JSON.stringify(articulos)
    fs.writeFileSync('articulos.json', articulos_json, 'utf-8')
    res.status(200).send("Articulo Creado Correctamente")
  } else {
    res.status(400).send('Solo el administrador puede Crear un articulo')
  }
})

router.post('/articulos/crear-video/:rol', sanitizarV, (req, res)=>{
  if(req.params.rol === "Admin") {
    let crearVideo = new articulo(req, res)
    lista.agregar(crearVideo);
    articulos.push(crearVideo)
    let articulos_json = JSON.stringify(articulos)
    fs.writeFileSync('articulos.json', articulos_json, 'utf-8')
    res.status(200).send("Articulo Creado Correctamente")
  } else {
    res.status(400).send('Solo el administrador puede realizar cambios')
  }
})

router.put('/articulos/modificar/:propiedad/:titulo/:rol', (req,res)=>{
  if(req.params.rol === "Admin") {
    if(typeof lista.lista[0] !== 'undefined'){
      lista.editar(req.params.titulo, req.params.propiedad,req,res);
      articulos = lista.articulos
      let articulos_json = JSON.stringify(articulos)
      fs.writeFileSync('articulos.json', articulos_json, 'utf-8')
      res.status(200).send('La propiedad fue modificada');
    }else{
      res.status(400).send('No hay articulos para modificar')
    }
  } else {
    res.status(400).send('Solo el administrador puede realizar cambios')
  }
})

router.delete('/articulos/delete/:titulo/:rol', (req, res) => {
  if (req.params.rol === "Admin") {
    if(typeof lista.lista[0] !== 'undefined'){
      lista.borrar(req.params.titulo, res)
      articulos = lista.articulos
      let articulos_json = JSON.stringify(articulos)
      fs.writeFileSync('articulos.json', articulos_json, 'utf-8')
      res.status(200).send('Articulo fue Eliminado');
    }else{
      res.send('No hay articulos para eliminar')
    }
  } else {
    res.status(400).send('Solo el administrador puede eliminar un articulo')
  }
})

module.exports = router;