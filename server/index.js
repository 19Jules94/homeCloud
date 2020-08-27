
const express = require('express')
const router = require('./routes/router.js');
const port = process.env.port || 3000;
const app = express();
app.use('',router);


app.get('',(req,res)=>{

    res.send("hola")
})
app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`); //variable de entorno port
}) 