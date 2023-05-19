const socket = io();

let productForm = document.getElementById("product_form");
let productList = document.getElementById('product_list');

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  const product = { title, description, price, code, stock, category };
  product.title = title;
  product.price = price;
  product.code = code;
  product.stock = stock;
  product.category = category;

  socket.emit('product', (product));

  console.log(product);
});

socket.on('productListed', async (product) => {
  const newProduct = `
  <li id="${product.id}">
  TITULO: ${product.title}<br>
  DESCRIPCION: ${product.description}<br>
  CODE: ${product.code}<br>
  STOCK: ${product.stock}<br>
  CATEGORIA: ${product.category} <br>
  <button onclick="deleteProduct('${product.id}')">DELETE</button>
</li> <br>
`
  productList.innerHTML += newProduct;
});


//Proceso de Delete

async function deleteProduct(id) {
  socket.emit('deleteProd', JSON.parse(id));
};

socket.on('successfullDelete', async (data) => {
  let del = document.getElementById(JSON.parse(data));
  del.remove();
});

