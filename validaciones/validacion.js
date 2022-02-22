const { body } = require('express-validator')
const { validationCreate } = require('./validacionAyudante')

const sanitizar = [
   body('titulo', "Ingrese un Titulo")
      .exists()
      .isLength({min: 10}),
   body('subtitulo', "Ingrese un Subtitulo")
      .exists()
      .isLength({min: 10}),
   body('autor', "Ingrese el Autor")
      .exists()
      .isLength({min: 2}),
   body('cuerpo', "Ingrese el Cuerpo")
      .exists()
      .isLength({min: 15}),
   body('enlaces', "Ingrese el Enlace")
      .custom( value => {
         if (typeof value === 'undefined') {
            return true
         } else {
            try {
               new URL(value)
               return true
            } catch (error) {
               return false
            }
         }
      }),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const sanitizarV = [
   body('titulo', "Ingrese un Titulo")
      .exists()
      .isLength({min: 10}),
   body('subtitulo', "Ingrese un Subtitulo")
      .exists()
      .isLength({min: 10}),
   body('autor', "Ingrese el Autor")
      .exists()
      .isLength({min: 2}),
   body('cuerpo', "Ingrese el enlace del Video")
      .exists()
      .isURL(),
   body('enlaces', "Ingrese el Enlace")
      .custom( value => {
         if (typeof value === 'undefined') {
            return true
         } else {
            try {
               new URL(value)
               return true
            } catch (error) {
               return false
            }
         }
      }),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

module.exports = { sanitizar, sanitizarV }