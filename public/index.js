//Socket client
const socket = io();
//Socket events--->trayendo productos en tiempo real
socket.on('updateProduct', data=>{
    let products = data.playload;
    fetch('templates/productsTable.handlebars').then(string=>string.text()).then(template=>{
        const processedT= Handlebars.compile(template);
        const templateObject={
            products:products
        }
        const html= processedT(templateObject);
        let table= document.getElementById('productsTable');
        table.innerHTML=html;
    })
})

/*Comentarios */

let textarea= document.getElementById('chatComents');
let user= document.getElementById('user');
textarea.addEventListener('keyup',(e)=>{
    if (e.key==='Enter') {    
        if (e.target.value) {
            socket.emit('message',{user:user.value, message:e.target.value})
        }    
    }
});

socket.on('messagelog',data=>{
    let com= document.getElementById('Coments');
    com.innerHTML=`${data[0].message.user} dijo: ${data[0].message.message}`
})

socket.on('coments',data=>{

    let mensajes= data.map(message=>{
        return `<div><span>${message.user} dice: ${message.message}</span></div>`
    }).join('');
    console.log(data)
    p.innerHTML = JSON.stringify(data);
    div.appendChild(p)
})





//Parte de envio de documento

document.addEventListener('submit', sendForm);

function sendForm(event){
    event.preventDefault();
    let form=document.getElementById('productForm');
    let data = new FormData(form);
    console.log(data)
    fetch('api/products',{
        method:'POST',
        body:data,

    }).then(result=>{
        return result.json();
    }).then(json=>{
        alert(JSON.stringify(json.message))
    })
}