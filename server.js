import express from 'express';
import cors from 'cors';
import upload from './services/upload.js';
import { engine } from 'express-handlebars';
import productRouter from './routes/products.js';
import Contenedor from './class/manager.js';

const manager=new Contenedor();

const app= express();

const PORT = 8080;
//8080,8081,3000,3001----process.env.port

const server = app.listen( PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});



app.engine('handlebars',engine())
app.set('views','./views')
app.set('view engine','handlebars')



/*LE DIGO QUE USE LAS RUTAS */
app.use('/api/products', productRouter);


/*PARA EL METODO POST, DEBO CONFIGURAR QUE RECIBE MI APP*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static('public'))

/*Handlebars */

app.get('/views/products',(req, res)=>{
    manager.getAll().then(result=>{
        let info = result.playload;
        let prepareObject={
            list : info
        }
        res.render('products', prepareObject);
    })
})

/*MULTER */

app.post('/api/uploadfile', upload.single('image'),(req,res)=>{
    const file= req.file;
    if (!file||file.length==0) {
        res.status(500).send({message: 'No se subio el archivo, algo no esta bien'})
    }
    res.send(file)
})


app.get('/',(req, res)=>{
    let products = simuloApi();
    let renderObj={
        arregloProd : products
    }
    res.render('Home', renderObj)
})




server.on('error', (error)=> console.log('Algo no esta bien... error: '+error))





