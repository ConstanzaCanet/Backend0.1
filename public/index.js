document.addEventListener('submit', event=>{
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
        alert(json)
    })
})