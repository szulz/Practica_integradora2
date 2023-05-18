const socket = io();

let productForm = document.getElementById("product_form")
let productList = document.getElementById('product_list')
let idToDeleteForm = document.getElementById("delete_by_id")


productForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const price = document.getElementById("price").value
  const code = document.getElementById("code").value
  const stock = document.getElementById("stock").value
  const category = document.getElementById("category").value

  const product = { title, description, price, code, stock, category }
  product.title = title
  product.price = price
  product.code = code
  product.stock = stock
  product.category = category

  socket.emit('product', (product))

  console.log(product);
})

idToDeleteForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const id = document.getElementById("id_to_delete").value
  socket.emit("idToDelete", (JSON.parse(id)))

})

socket.on('productDeleted', (data)=>{
  
})

socket.on('productListed', (product) => {
  const title = `<li>${product.title}</li>`
  const description = `<li>${product.description}</li>`
  const code = `<li>${product.code}</li>`
  const stock = `<li>${product.stock}</li>`
  const category = `<li>${product.category}</li>`
  const id = `<li>${product.id}</li>`
  productList.innerHTML += title
  productList.innerHTML += description
  productList.innerHTML += code
  productList.innerHTML += stock
  productList.innerHTML += category
  productList.innerHTML += id
})