//Socket client
const socket = io();
//Socket events--->trayendo productos
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