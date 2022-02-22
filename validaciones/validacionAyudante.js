const { validationResult } = require('express-validator')

const validationCreate = (req, res, next) => {
   try {
      validationResult(req).throw()
      return next()
   } catch (err) {
      res.status(403).send({ error: err.array() })
   }
}

module.exports = { validationCreate }