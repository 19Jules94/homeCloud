const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fileUpload = require("express-fileupload");
require("dotenv").config();
router.use(fileUpload());
const storage = process.env.STORAGE;

const processPath = (storagePath) => {
  const relativePath = storagePath ? storagePath.replace(/-/g, "/") : "/";
  return { relativePath, absolutePath: path.join(storage, relativePath) };
};

const moveFile = (pathDestino, file) => {
  return new Promise((resolve, reject) => {
    file.mv(path.join(pathDestino,file.name), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

router.post("/:path?", async(req, res,next) => {
  let files = req.files.files;  
  const pathDirectorio = processPath(req.params.path);
  if(!Array.isArray(files)){
    files=[files];
  }

  try{
    for (const file of files){
      await moveFile(pathDirectorio.absolutePath,file);
    }
  }catch(err){
    return next(err);
  }
  res.json({
    message:"Subido con exito",
    path:pathDirectorio.relativePath
  });
});


router.get("/:path?", async (req, res) => {
  try {
    const directorio = processPath(req.params.path);
    //console.log({ path: directorio });
    const directo = await fs.promises.opendir(directorio.absolutePath);
    const contenido = { archivos: [], directorios: [] };
  
    for await (const dir of directo) {
      if (dir.isDirectory()) {
        contenido.directorios.push(dir.name);
      } else {
        contenido.archivos.push(dir.name);
      }
    }
    res.send({ path: directorio, contenido });
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(400).send("No hay directorio o archivo");
    } else {
      res.status(500).send("Algo va mal" + err);
    }
  }
});

module.exports = router;
