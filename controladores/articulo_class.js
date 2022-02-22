class articulo{
   constructor(req, res){
      this.titulo = req.body.titulo;
      this.subtitulo = req.body.subtitulo;
      this.fecha = this.traeFecha();
      this.autor = req.body.autor;
      this.cuerpo = req.body.cuerpo;
      if (typeof req.body.enlaces !== 'undefined') {
         this.enlaces = req.body.enlaces;
      }
      this.vistas = 0;
   }

   traeFecha() { 
      const date = new Date();
      const año = date.getFullYear();
      const mes = date.getMonth();
      const dia = date.getDate();
      const fecha = año+"/"+mes+"/"+dia;
      return fecha
   }
}

module.exports = articulo;
