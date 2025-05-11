// Lista del carrito
let carrito = [];

// Añadir producto al carrito (si ya está, suma uno)
function agregarAlCarrito(nombre, precio) {
  const item = carrito.find(producto => producto.nombre === nombre);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

// Mostrar los productos en pantalla
function actualizarCarrito() {
  const lista = document.getElementById('items-carrito');
  lista.innerHTML = '';

  let total = 0;

  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    li.innerHTML = `
      ${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}
      <div>
        <button class="btn btn-sm btn-secondary me-1" onclick="restarProducto('${producto.nombre}')">-</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarProducto('${producto.nombre}')">Eliminar</button>
      </div>
    `;

    lista.appendChild(li);
    total += producto.precio * producto.cantidad;
  });

  document.getElementById('precio-total').textContent = `Total: $${total}`;
}

// Restar una unidad (o eliminar si queda en 0)
function restarProducto(nombre) {
  const item = carrito.find(p => p.nombre === nombre);
  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) {
      eliminarProducto(nombre);
    } else {
      actualizarCarrito();
    }
  }
}

// Eliminar producto completamente
function eliminarProducto(nombre) {
  carrito = carrito.filter(p => p.nombre !== nombre);
  actualizarCarrito();
}

// Vaciar todo el carrito
function vaciarTodo() {
  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    carrito = [];
    actualizarCarrito();
  }
}
