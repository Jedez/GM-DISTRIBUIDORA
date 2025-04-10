// Función para obtener el parámetro de la URL
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Función para cargar los productos desde un archivo JSON
async function cargarProductos() {
    const response = await fetch('../javaScript/datos-marcas/equipos.json');
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
async function mostrarProductos() {
    const marca = obtenerParametroURL('producto');
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
        // Modificación: Mostrar solo el nombre del primer producto
        tituloMarca.textContent = productosMarca[0].nombre; // Mostrar el nombre del primer producto
        const primeraDescripcion = `Descubre la selección de lentes y accesorios de la marca ${marca.toUpperCase()} en GM Distribuidora.`;
        actualizarMetaDescripcion(primeraDescripcion);

        productosDiv.innerHTML = productosMarca.map(producto => `
            <div class="product-card" data-producto='${JSON.stringify(producto)}'>
                <div class="product-content">
                    <img loading="lazy" src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="product-details">
                        <p class="product-description">${producto.descripcion}</p>
                    </div>
                </div>
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