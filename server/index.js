
const express = require('express')
const contentRouter = require('./src/routes/content');
const uploadRouter = require('./src/routes/upload')
const dirRouter = require('./src/routes/dir')
const cors = require('cors');

const port = process.env.port || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{res.send('Home  cloud')});
app.use('/content',contentRouter)
app.use('/upload',uploadRouter)
app.use('/dir',dirRouter)

app.listen(port,()=>{
    console.log(`Escuchando en el puerto ${port}`); //variable de entorno port
}) 