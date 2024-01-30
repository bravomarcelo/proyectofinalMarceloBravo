const pintarCarrito = () => {
  cuadriculaContainer.innerHTML = "";
  cuadriculaContainer.style.display = "flex";

  const cuadriculaHeader = document.createElement("div");
  cuadriculaHeader.className = "cuadricula-header";
  cuadriculaHeader.innerHTML = `
        <h1 class="cuadricula-header-title">Carrito.</h1>
    `;
  cuadriculaContainer.append(cuadriculaHeader);

  const cuadriculabutton = document.createElement("h1");
  cuadriculabutton.innerText = "x";
  cuadriculabutton.className = "cuadricula-header-button";

  cuadriculabutton.addEventListener("click", () => {
    cuadriculaContainer.style.display = "none";
  });

  cuadriculaHeader.append(cuadriculabutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "carrito-content";
    carritoContent.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p>${product.precio} $</p>
    <span class="restar"> - </span>
    <p>Cantidad: ${product.cantidad}</p>
    <span class="sumar"> + </span>
    <p>Total: ${product.cantidad * product.precio}</p>
    <span class="delete-product"> ❌ </span>
    `;

    cuadriculaContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar")

    restar.addEventListener("click", () => {
        if(product.cantidad !== 1){
        product.cantidad--;
        }
        saveLocal();
        pintarCarrito ();
    });

    let sumar = carritoContent.querySelector(".sumar")
    sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        pintarCarrito();
    })

    let eliminar = carritoContent.querySelector(".delete-product")
    eliminar.addEventListener("click", () =>  {
      eliminarProducto (product.id);
    })
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total a pagar: ${total} $`;
  cuadriculaContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);
  console.log(foundId); 

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter ();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {

  cantidadCarrito.style.display = "block"; 
  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

}

carritoCounter();