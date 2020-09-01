
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const processPath = require('../libs/processPath')
const createFolder = require('../libs/mkdir')

router.post("/:path?", async (req, res) => {
    const pathDirectorio = processPath(req.params.path);
    try {
      await createFolder(pathDirectorio.absolutePath, "prueba");
    } catch (err) {
      console.log(err.message);
    }
    res.json({message:"Carpeta creada con exito"})
  });

  module.exports = router;