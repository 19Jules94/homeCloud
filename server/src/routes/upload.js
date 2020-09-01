const router = require('express').Router();
const fileUpload = require('express-fileupload');
const processPath = require('../libs/processPath')
const moveFile = require('../libs/mv')

router.use(fileUpload());

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

  module.exports = router;
  
 
 
  
  