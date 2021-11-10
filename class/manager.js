const fs = require('fs');

let ide=0;
/*Creo la clase contenedor que va a servir para la creacion del archivo que yo quiera */
class Contenedor{

    /*Funcion que guarde objeto en archivo---> Esto reescribe el archivo */
    save(name,img){
        let data =[
            {
                nombre:name,
                id:ide,
                img:img
         }
        ];

        try{
            fs.writeFileSync('./files/objectSaved.txt', JSON.stringify(data))
            return console.log('Exelente');
        }catch(error){
            throw new Error('No se Rick, parece falso... algo salio mal!')
        }
    };
    /*Seleccionar o buscar por id 
    */
    
    async getById(id){
        try{
            let array = await fs.promises.readFile('./files/objectSaved.txt', 'utf-8')
            let data = JSON.parse(array)
            const elementoX = data.filter(element => element.id === id);
            if (elementoX.length > 0) {
                return { status:'success', playload:elementoX}
            }else{
                return {status: "error", message:'Eso no lo tenemos'}
            }
        }catch(error){
            return {status: "error", message: 'Me parece que no'}
        }
    };
/*
    async getById(id){
        try{
        let data = await fs.promises.readFile('../files/objectSaved.txt', 'utf-8')
        let objeticos = JSON.parse(data);
        let producto = objeticos.find(element=>element.id===id);
        if(producto){
        return {status:"success",playload: producto}
        }else{
        return {status:"error",playload:null,message:"Objetico no encontrado"}
        }
        }catch(err){
        return {status:"error",message:"No se encontró el producto"}
        }
    };

    */
    
    /*Elimina el objeto que busco por id*/
    deleteById(id){
        
            const array= (this.getAll());
            const arrayDos= array.playload
    
            const filtrado = arrayDos.filter(element => element.id != id);
            if (filtrado.length != 0){
               return fs.writeFile('./files/objectSaved.txt', JSON.stringify(filtrado), error=>{
                   if (error) {
                       console.log('Algo no funciono')
                   }else{
                    console.log('Guardo el cambio')
                    console.log(this.getAll("./objectSaved.txt"))
                   }
               });
            }
    };
    
    
    /*Muestro todo lo que hay en el archivo */
    async getAll(){
        try{
            const todo= await fs.promises.readFile('./files/objectSaved.txt', 'utf-8');
            const productos= JSON.parse(todo)
            return {statuss: "success", playload:productos};
        }catch(error){
            return {status:'error', message:'Me parece que no hay nada...'}
        }
    }
    
    /*Creo una funcion que agregue objeto */
    async addObject(nuevo, img){
        try{
        let data = await fs.promises.readFile('../files/objectSaved.txt','utf-8')
        let objeticosA = JSON.parse(data);
        if(objeticosA.some(element => element.nombre === nuevo)){//Si existe
            return {satatus:'error', message: "No, no, ese producto ya esta!"}
        }else{//Si no existe
            let nuevoO = {
                nombre: nuevo,
                id: ide++,
                img:img
               }
        const objeticosN=[...objeticosA, nuevoO];
        try{
        await fs.promises.writeFile('../files/objectSaved.txt',
        JSON.stringify(objeticosN));
        return {status:"success",message:"Exelente, agregado"}
        }catch(err){
        return {status:"error", message:"No se pudo agregar"}
        }
        }
        }catch{
        //El archivo no existe, entonces hay que crearlo.
        let nuevoO = {
            nombre: nuevo,
            id: ide++,
            img:img
           }
        try{
        await fs.promises.writeFile('../files/objectSaved.txt',JSON.stringify([nuevoO],null,2))
        return {status:"success",message:"creado con éxito"}
        }catch(error){
        return {status:"error",message:"No se pudo crear: "+error}
        }
        }
        };
    
    
    /*Elimina todo lo que hay en el archivo ----> hice uno que borra lo que hay adentro */
    deleteAll(){
        fs.truncate('../files/objectSaved.txt', 0, function(){console.log('eliminado')})
    };
    
    /*Creo uno que elimine el archivo en si */
    deletFile(){
    
        fs.unlink('../files/objectSaved.txt', error =>{
            if (error) {
                console.log('Upss! Algo salio mal!')
            }else{
                console.log('Objetivo eliminado')
            }
        })
    }

};



module.exports = Contenedor;