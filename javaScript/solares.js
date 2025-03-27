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
        actualizarMetaDescripcion('Explora nuestra variedad de productos en GM Distribuidora.'); // Metadescripción genérica
        return;
    }

    const productos = await cargarProductos();
    const productosMarca = productos[marca];

    if (productosMarca && productosMarca.length > 0) {
        tituloMarca.textContent = `${marca.toUpperCase()}`;
        // Crear una descripción basada en el primer producto de la marca (puedes ajustarlo)
        const primeraDescripcion = `Descubre la selección de lentes y accesorios de la marca ${marca.toUpperCase()} en GM Distribuidora.`;
        actualizarMetaDescripcion(primeraDescripcion);

        productosDiv.innerHTML = productosMarca.map(producto => `
            <div class="product-card">
                <img loading="lazy" src="${producto.imagen}" alt="${producto.nombre}">
                <p>${producto.nombre}</p>
            </div>
        `).join('');
    } else {
        productosDiv.innerHTML = `<p>No hay productos disponibles para esta marca.</p>`;
        actualizarMetaDescripcion(`No hay productos disponibles para la marca ${marca} en GM Distribuidora.`); // Metadescripción específica si no hay productos
    }
}

// Ejecutar la función al cargar la página
window.onload = mostrarProductos;