require("dotenv").config();
const storage = process.env.STORAGE;
if(!storage){
    console.error('La variable de entorno storage no esta definida,revisa tu archivo .env');

    process.exit(1);
}

module.exports = storage;