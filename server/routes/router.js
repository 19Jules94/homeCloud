const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');
const { dir } = require("console");
require("dotenv").config();

const storage = process.env.STORAGE;



processPath = (storagePath) => {
 
  const relativePath =storagePath ? storagePath.replace(/-/g, "/") : "/";
  //console.log(path.join(storage,relativePath));
  return {relativePath,absolutePath:path.join(storage,relativePath)};

};

router.get("/:path?", async(req, res) => {
  try { 
  const directorio = processPath(req.params.path);
  //console.log({ path: directorio });
  const directo = await fs.promises.opendir(directorio.absolutePath); 
  const contenido = {archivos:[],directorios:[]};
 
  /*
    Los corchetes se usan para series que poseen valores simples, mientras que las llaves 
    son utilizadas para las series en que hay distintos objetos y 
    propiedades con diferentes valores
    */
   
   for await (const dir of directo) {
     if(dir.isDirectory()){
       contenido.directorios.push(dir.name);
     }else{
       contenido.archivos.push(dir.name);
     }
   } 
   res.send({ path: directorio,contenido});      
 
  }catch(err){
    if(err.code ==="ENOENT"){
      res.status(400).send("No hay directorio o archivo")
    }else{
      res.status(500).send("Algo va mal"+err);
    }
  }
  
});

module.exports = router;
