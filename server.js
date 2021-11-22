const express = require('express');
const cors= require('cors');
const app= express();


const PORT = 8080;
//8080,8081,3000,3001----process.env.port


const server = app.listen( PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

const Contenedor = require('./class/manager');
const manager = new Contenedor();

/*CONECTO RUTAS */
const productRouter = require('./routes/products');

/*LE DIGO QUE USE LAS RUTAS */
app.use('/api/products', productRouter);


/*PARA EL METODO POST, DEBO CONFIGURAR QUE RECIBE MI APP*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());



server.on('error', (error)=> console.log('Algo no esta bien... error: '+error))





