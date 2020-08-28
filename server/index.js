
const express = require('express')
const router = require('./routes/router.js');
const port = process.env.port || 3000;
const app = express();
const cors = require('cors');
app.use('',router);
app.use(express.json());


app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`); //variable de entorno port
}) 