
function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
}

//cuando preciono agregar, crear un carrito y si agrego, la proxima vez que toque, no crea otro carro, capturo el id => agrego el producto al carro.
let key = 0
function addProduct(id) {
    if (key === 0) {
        key = 1
        console.log('aca');
        fetch(`/api/carts`, {
            method: "POST",
        })
        .then(response => response.json())
            console.log(response);
    }
    console.log(key);
    /*
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
    */
}

/*
async function deleteProduct(id) {

    return
}
*/