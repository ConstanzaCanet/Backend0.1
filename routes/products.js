const express = require ('express');
const router =express.Router();
const Contenedor =require('../class/manager');
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

router.get('/productoRandom',(req, res)=>{
    const idRandom=Number(8);
    manager.getById(idRandom).then((result=>{

        if (result.status === 'success') {
            res.send(result.playload)
        }else{
            res.send('Ese producto no se encuentra, lo siento')
        }
    }))
});

/*POST*/

router.post('/', (req, res)=>{
    let body = req.body;
    manager.addObject(body).then(result=>{
        res.send(result)
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





module.exports = router;