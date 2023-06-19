function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
}


//cuando preciono agregar, crear un carrito y si agrego, la proxima vez que toque, no crea otro carro, capturo el id => agrego el producto al carro.
async function addProduct(id) {
    let key = localStorage.getItem('key')
    console.log(key);
    if (key === null) {
        localStorage.setItem('key', 'pass')
        fetch(`/api/carts`, {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cartData', JSON.stringify(data.data._id))
                console.log(data);
                fetch(`/api/carts/${data.data._id}/products/${id}`, {
                    method: "POST",
                })
            })
        return
    }
    let cartId = localStorage.getItem('cartData')
    fetch(`/api/carts/${JSON.parse(cartId)}/products/${id}`, {
        method: "POST",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

}

/*
async function goToCart() {
    let cartId = localStorage.getItem('cartData')
    fetch(`/api/carts/${JSON.parse(cartId)}/products/${id}`, {
        method: "POST",
    })
    return
}
*/

async function clearLocalStorage() {
    return localStorage.clear()
}