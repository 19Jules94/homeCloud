
const router = require('express').Router();

const processPath = require('../libs/processPath')
const createFolder = require('../libs/mkdir')

router.post("/:path?", async (req, res) => {
    const pathDirectorio = processPath(req.params.path);
    try {
      await createFolder(pathDirectorio.absolutePath, "test1");
    } catch (err) {
      console.log(err.message);
    }
    res.json({message:"Carpeta creada con exito"})
  });

  module.exports = router;