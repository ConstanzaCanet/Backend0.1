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
let email = document.getElementById('userEmail')

/*funcion para valiacion de email*/
function validarEmail(em){
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido= expReg.test(em);
    return esValido;
}

/*Funcion para enviar comentarios, con validaciones incluidas */
textarea.addEventListener('keyup',(e)=>{
    if (e.key==='Enter') {    
        if (e.target.value) {
            if (user.value==='') {
                return alert('Lo siento falta tu usuario para comentar eso!')
            }
            else if(email.value===''){
                return alert('Lo siento falta el email!')
            }
            else if (validarEmail(email.value)!= true) {
                return alert('Lo siento ese email ese email esta raro! Porfavor cambialo')
            }
            else if (textarea.value.trim()==='') {
                return alert('Lo siento ese mensaje es muy pequeño, porfavor comenta mas')
            }
            else{
                socket.emit('message',{user:user.value, message:e.target.value})
            }
        }    
    }
});

socket.on('messagelog',data=>{
    let com= document.getElementById('Coments');

    let comenTario=data.map(m=>{
        return `<div class='divComents'><span><b>${m.message.user}</b> dice: ${m.message.message}</span><br/><p>${m.time}</p></div>`
    }).join('');
    com.innerHTML=comenTario;
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