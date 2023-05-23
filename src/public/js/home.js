function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
}