import express from 'express';
import upload from '../services/upload.js';
import Contenedor from '../class/manager.js';
import {io} from '../server.js'
const router =express.Router();

const manager = new Contenedor();

/*GET */
router.get('/',(req,res)=>{
    manager.getAll().then(result =>{
        if (result.statuss==='success') {
            res.status(200).send(result.playload);  
        }else{
            res.status(404).send(result.message);
        }
    })
});

router.get('/:pid', async (req, res)=>{
    const productId = parseInt(req.params.pid);
    let datos = await manager.getById(productId);
    if (datos.status === 'success') {
        res.send(datos.playload)
    }else{
        res.send('Ese producto no se encuentra, lo siento')
    }
});


/*POST---> con socket conecto la funcion de socket y con emit llamo el evento establecido en index.js*/

router.post('/', upload.single('image'),(req, res)=>{

    let file = req.file;
    console.log(file)
    let product = req.body;
    product.price= parseInt(product.price)
    product.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/img/'+file.filename;
    console.log(JSON.stringify(product))
    manager.addObject(product).then(result=>{
        res.send(result);
        if (result.status=== 'success') {
            manager.getAll().then(result=>{
                io.emit('updateProduct', result);
            })
        }
    })
})

/*PUT */
router.put('./:pid',(req, res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid);
    manager.updateProduct(id,body).then(result=>{
        res.send(result);
    })
});

/*DELETE */
router.delete('/:pid',(req, res)=>{
    let id= parseInt(req.params.pid);
    manager.deleteById(id).then(result=>{
        res.send(result)
    })
})





export default router;