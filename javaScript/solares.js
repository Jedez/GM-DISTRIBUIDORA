// Función para obtener el parámetro de la URL
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

// Función para cargar los productos desde un archivo JSON
async function cargarProductos() {
    const response = await fetch('../javaScript/datos-marcas/solares.json');
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

        productosDiv.innerHTML = productosMarca.map((producto, index) => `
            <div class="product-card">
                <div class="image-container">
                    <img loading="lazy" src="${producto.imagen}" alt="${producto.nombre}" data-modal-target="#modal-imagen" data-image-src="${producto.imagen}">
                </div>
                <div class="product-info">
                    <div class="product-nombre">${producto.Modelo || producto.nombre}</div>
                    <div class="product-stock">Stock: ${producto.Stock || producto.stock || 'N/A'}</div>
                </div>
            </div>
        `).join('');

        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modal = document.getElementById('modal-imagen');
        const modalImage = modal.querySelector('.modal-image');
        const closeButton = modal.querySelector('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                const imageSrc = this.dataset.imageSrc;
                modalImage.src = imageSrc;
                modal.style.display = 'block';
                document.body.classList.add('modal-open');
            });
        });

        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });

    } else {
        productosDiv.innerHTML = `<p>No hay productos disponibles para esta marca.</p>`;
        actualizarMetaDescripcion(`No hay productos disponibles para la marca ${marca} en GM Distribuidora.`);
    }
}

window.onload = mostrarProductos;