// Función para obtener el parámetro de la URL
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Función para cargar los productos desde un archivo JSON
async function cargarProductos() {
    const response = await fetch('../javaScript/datos-marcas/productos.json');
    return await response.json();
}

// Función para actualizar la metadescripción de la página
function actualizarMetaDescripcion(descripcion) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = descripcion;
}

// Función para mostrar los productos según la marca seleccionada
// ... (Tus funciones existentes: obtenerParametroURL, cargarProductos, actualizarMetaDescripcion) ...

async function mostrarProductos() {
    const marca = obtenerParametroURL('marca');
    const productosDiv = document.getElementById('productos-list');
    const tituloMarca = document.getElementById('marca-titulo');

    if (!marca) {
        productosDiv.innerHTML = `<p>No se ha seleccionado una marca.</p>`;
        actualizarMetaDescripcion('Explora nuestra variedad de productos en GM Distribuidora.');
        return;
    }

    const productos = await cargarProductos();
    const productosMarca = productos[marca];

    if (productosMarca && productosMarca.length > 0) {
        tituloMarca.textContent = `${marca.toUpperCase()}`;
        const primeraDescripcion = `Descubre la selección de lentes y accesorios de la marca ${marca.toUpperCase()} en GM Distribuidora.`;
        actualizarMetaDescripcion(primeraDescripcion);

        productosDiv.innerHTML = productosMarca.map(producto => `
            <div class="product-card" data-producto='${JSON.stringify(producto)}'>
                <img loading="lazy" src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
            </div>
        `).join('');

        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const producto = JSON.parse(card.dataset.producto);
                mostrarDetallesProducto(producto);
            });
        });
    } else {
        productosDiv.innerHTML = `<p>No hay productos disponibles para esta marca.</p>`;
        actualizarMetaDescripcion(`No hay productos disponibles para la marca ${marca} en GM Distribuidora.`);
    }
}

function mostrarDetallesProducto(producto) {
    const modal = document.getElementById('modal-producto');
    const modalNombre = document.getElementById('modal-nombre');
    const modalImagen = document.getElementById('modal-imagen');
    const modalDimensiones = document.getElementById('modal-dimensiones');
    const modalStock = document.getElementById('modal-stock');

    modalNombre.textContent = producto.nombre;
    modalImagen.src = producto.imagen;
    modalImagen.alt = producto.nombre;
    modalDimensiones.textContent = `Dimensiones: ${producto.dimensiones || 'No disponibles'}`;
    modalStock.textContent = `Stock: ${producto.stock || 'No disponible'}`;

    modal.style.display = 'block';

    // Asignar el evento de clic al botón "X" dentro de la función mostrarDetallesProducto
    const cerrarModal = modal.querySelector('.cerrar-modal');
    if (cerrarModal) {
        cerrarModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal-producto');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

window.onload = mostrarProductos;

// ... (Tus funciones existentes: obtenerParametroURL, cargarProductos, actualizarMetaDescripcion) ...

// ... (Tus funciones existentes: obtenerParametroURL, cargarProductos, actualizarMetaDescripcion) ...
