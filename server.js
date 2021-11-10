const express = require('express');
const Contenedor = require('./class/manager');


const app= express();

const PORT = 8080;
//8080,8081,3000,3001----process.env.port

let contador=0;


const manager = new Contenedor();


const server = app.listen( PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});

server.on('error', (error)=> console.log('Algo no esta bien... error: '+error))



app.get('/',(req, res)=>{
    res.send('<h1>ESTA PÁGINA ES EL HOME<h1>')
});

app.get('/productos',(req, res)=>{
    manager.getAll().then(result =>{
        if (result.statuss==='success') {
            res.status(200).send(result.playload);  
        }else{
            res.status(404).send(result.message);
        }
    })
});

app.get('/productoRandom',async(req, res)=>{
    const idRandom=5;
    let datos = await manager.getById(idRandom);
    if (datos.status === 'success') {
        res.send(datos.playload)
    }else{
        res.send('Ese producto no se encuentra, lo siento')
    }
});




app.get('/products/:pid', async (req, res)=>{
    const productId = Number(req.params.pid);
    console.log(productId)
    let datos = await manager.getById(productId);
    if (datos.status === 'success') {
        res.send(datos.playload)
    }else{
        res.send('Ese producto no se encuentra, lo siento')
    }
})