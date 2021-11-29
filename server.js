import express from 'express';
import upload from './services/upload.js';
import { engine } from 'express-handlebars';
import productRouter from './routes/products.js';
import Contenedor from './class/manager.js';
import {Server} from 'socket.io';
import __dirname from './utils.js'

const manager=new Contenedor();

const app= express();

const PORT = 8080;
//8080,8081,3000,3001----process.env.port

const server = app.listen( PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});
export const io= new Server(server);
let comentarios=[];

var d = new Date()
let año=d.getFullYear();
let mes=d.getMonth()+1;
let num=d.getDate();
let dia=new Array(7);
dia[0]="Domingo";
dia[1]="Lunes";
dia[2]="Martes";
dia[3]="Miercoles";
dia[4]="Jueves";
dia[5]="Viernes";
dia[6]="Sabado";

let h=d.getHours();
let m=d.getMinutes();
/*Establezco la fecha y hora para enviar en comentarios */
let fechaActual= dia[d.getDay()]+' '+num+'/'+mes+'/'+año+' Hora: '+h+':'+m+'hs'

/*Vistas, rutas */
app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(express.static(__dirname+'/public'));
app.use('/api/products', productRouter);


/*PARA EL METODO POST, DEBO CONFIGURAR QUE RECIBE MI APP*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));



/*Vistas de Handlebars--->  traigo plantilla con data */

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


//server.on('error', (error)=> console.log('Algo no esta bien... error: '+error))

/*SOCKET Productos en tiempo real*/

io.on('connection',async socket=>{
    console.log(`Socket ${socket.id} esta conectado ahorita`)
    let products= await manager.getAll();
    socket.emit('updateProduct',products);
    socket.on('message',data=>{
        console.log(data)
    })

});

/* Socket ChatComents*/

io.on('connection',socket=>{
    socket.on('message',data=>{
        comentarios.push({id:socket.id,time:fechaActual,message:data})
        io.emit('messagelog',comentarios)
    })
})



