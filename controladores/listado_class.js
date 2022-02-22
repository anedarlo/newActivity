class lista{
   constructor(){
      this.lista = [];
   }

   traeFecha() { 
      const date = new Date();
      const año = date.getFullYear();
      const mes = date.getMonth();
      const dia = date.getDate();
      const fecha = año+"/"+mes+"/"+dia;
      return fecha
   }

   agregar(art){
      this.lista.push(art);
   }

   mostrar(res){
      let ListaArray=[];
      this.lista.forEach(e => {
         ListaArray.push({
            titulo: e.titulo
         })
      });
      res.status(200).json(ListaArray);
   }

   buscar(title,res){
      let Articulo = this.lista.find(e=> e.titulo == title);
      if(typeof Articulo === 'undefined'){
         res.status(400).send('el articulo que desea ver no existe');
      }else{
         
         this.lista[this.lista.indexOf(Articulo)].vistas++;
         res.status(200).json(Articulo);
         
         function buscar(title,res) {
            lista.find(title,res)
               .then(function(Articulo) {
                  res.send(Articulo)
               })
               .catch(function(err){
                  res.send(err);
               })
         }
      }
   }

   editar(title,prop,req,res){
      let property = ['titulo','subtitulo', 'autor', 'cuerpo','enlaces']
      let article = this.lista.find(e => e.titulo == title);
      if(typeof article === 'undefined' || !property.includes(prop)){
         res.status(400).send('Esta intenttando modificar un valor que no existe');
      }else{
         switch (prop) {
            case 'titulo':
               this.lista[this.lista.indexOf(article)].titulo = req.body.titulo;
               break;
            case 'subtitulo':
               this.lista[this.lista.indexOf(article)].subtitulo = req.body.subtitulo;
               break;
            case 'autor':
               this.lista[this.lista.indexOf(article)].autor = req.body.autor;
               break;
            case 'cuerpo':
               this.lista[this.lista.indexOf(article)].cuerpo = req.body.cuerpo;
               break;
            case 'enlaces':
               this.lista[this.lista.indexOf(article)].enlaces = req.body.enlaces;
               break;
         }
      }
   }

   borrar(title,res){
      let Articulo = this.lista.find(e=> e.titulo == title);
      if(typeof Articulo !== 'undefined'){
         this.lista = this.lista.filter(e=> e.titulo !== title);
      } else {
         res.status(400).send('el articulo que desea ver no existe');
      }
   }
}

module.exports = lista;