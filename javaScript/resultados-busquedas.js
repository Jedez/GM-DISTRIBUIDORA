// Función para obtener el parámetro de la URL
function obtenerParametroURL(parametro) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(parametro);
    console.log(`[URL] Parámetro '${parametro}':`, value);
    return value;
   }
  
   // Función para cargar los productos desde múltiples archivos JSON
   async function cargarProductos() {
    const archivosJSON = [
     '../javaScript/datos-marcas/equipos.json',
     '../javaScript/datos-marcas/productos.json',
     '../javaScript/datos-marcas/solares.json'
    ];
  
    let todosLosProductos = [];
  
    try {
     for (const archivo of archivosJSON) {
      const response = await fetch(archivo);
      if (!response.ok) {
       throw new Error(`Error al cargar ${archivo}: ${response.status} - ${archivo}`);
      }
      const data = await response.json();
      console.log(`[CARGA] Archivo: ${archivo}, Datos:`, JSON.parse(JSON.stringify(data)));
  
      for (const category in data) {
       if (data.hasOwnProperty(category) && Array.isArray(data[category])) {
        data[category].forEach(producto => {
         producto.sourceFile = archivo;
         producto.category = category.trim();
         producto.nombre = producto.nombre ? producto.nombre.trim() : "";
         producto.descripcion = producto.descripcion ? producto.descripcion.trim() : "";
         console.log(`  [PRODUCTO] Archivo: ${archivo}, Categoría: ${category}, Producto:`, JSON.parse(JSON.stringify(producto)));
         todosLosProductos.push(producto);
        });
       }
      }
     }
     console.log("TODOS LOS PRODUCTOS:", JSON.stringify(todosLosProductos, null, 2));
     return todosLosProductos;
  
    } catch (error) {
     console.error("Error al cargar los productos:", error);
     document.getElementById('resultados-container').innerHTML = `<p class="error-message">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>`;
     return null;
    }
   }
  
   // Función para mostrar los productos basados en el parámetro de búsqueda
   async function mostrarProductos() {
    const query = obtenerParametroURL('query');
    const resultadosContainer = document.getElementById('resultados-container');
    const terminoBusqueda = document.getElementById('termino-busqueda');
  
    console.log("Buscando:", query);
  
    if (!query) {
     resultadosContainer.innerHTML = `<p>No se ha especificado un término de búsqueda.</p>`;
     terminoBusqueda.textContent = '';
     return;
    }
  
    terminoBusqueda.textContent = query;
  
    const productos = await cargarProductos();
    if (!productos) {
     return;
    }
  
    const queryLower = query.toLowerCase().trim();
  
    const productosFiltrados = productos.filter(producto => {
     let nombreCoincide = producto.nombre && producto.nombre.toLowerCase().includes(queryLower);
     let categoriaCoincide = producto.category && producto.category.toLowerCase().includes(queryLower);
     let descripcionCoincide = producto.descripcion && producto.descripcion.toLowerCase().includes(queryLower);
     let resultado = nombreCoincide || categoriaCoincide || descripcionCoincide;
     console.log(`  [FILTRO] Producto: ${producto.nombre}, Categoría: ${producto.category}, Coincide: ${resultado}`);
     return resultado;
    });
  
    console.log("Productos filtrados:", JSON.stringify(productosFiltrados, null, 2));
  
    if (productosFiltrados.length > 0) {
     let html = '';
     productosFiltrados.forEach(producto => {
      html += `
              <div class="producto-resultado card">
                  <img loading="lazy" src="${producto.imagen}" alt="${producto.nombre}">
                  <div class="product-details">
                      <p class="product-description">${producto.descripcion || ''}</p>
                      <p class="product-name">${producto.nombre || ''}</p>
                      <p class="product-category">Categoría: ${producto.category || ''}</p>
                  </div>
              </div>
          `;
     });
     resultadosContainer.innerHTML = html;
     console.log("  [HTML]:", html);
    } else {
     resultadosContainer.innerHTML = `<p class="no-resultados">No se encontraron productos para "${query}".</p>`;
    }
   }
  
   window.onload = mostrarProductos;