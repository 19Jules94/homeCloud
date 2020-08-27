const express = require('express');
const router = express.Router();

processPath = (path)=>{
    return path ?  path.replace(/-/g,'/'):('/');
}

router.get('/:path?',(req,res)=>{
    console.log({path:processPath(req.params.path)});
    res.send({path:processPath(req.params.path)});

});

module.exports = router;