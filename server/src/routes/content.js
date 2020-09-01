const router = require('express').Router();
const fs = require('fs');
const processPath = require('../libs/processPath')


router.get("/:path?", async (req, res,next) => {
    try {
      const directorio = processPath(req.params.path);     
      console.log(directorio);
      const directo = await fs.promises.opendir(directorio.absolutePath);
      const contenido = { archivos: [], directorios: [] };
      for await (const dir of directo) {
        if (dir.isDirectory()) {
          contenido.directorios.push(dir.name);
        } else {
          contenido.archivos.push(dir.name);
        }
      }
      res.json({ path: directorio, contenido });
      console.log({ path: directorio, contenido });
    } catch (err) {
      if (err.code === "ENOENT") {
        res.status(400).send("No hay directorio o archivo");
      } else {
        res.status(500).send("Algo va mal" + err);
      }
    }
  });
  
  module.exports = router;
  