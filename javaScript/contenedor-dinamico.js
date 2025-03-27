function ajustarMargen() {
    const header = document.querySelector('.navbar');
    const container = document.querySelector('.container-productos');

    if (header && container) {
        const headerHeight = header.getBoundingClientRect().height;
        container.style.marginTop = `${headerHeight + 20}px`;
    }
}

function cargarImagenesYAjustarMargen() {
    const imagenes = document.querySelectorAll('.product-card img');
    let imagenesCargadas = 0;

    imagenes.forEach(img => {
        if (img.complete) {
            imagenesCargadas++;
        } else {
            img.onload = () => {
                imagenesCargadas++;
                if (imagenesCargadas === imagenes.length) {
                    ajustarMargen();
                }
            };
        }
    });

    if (imagenesCargadas === imagenes.length) {
        ajustarMargen();
    }
}

// Ejecutar cuando toda la página ha cargado
window.addEventListener("load", () => {
    cargarImagenesYAjustarMargen();
    ajustarMargen();
});

// Ajustar cuando el tamaño de la ventana cambie
window.addEventListener("resize", ajustarMargen);

// Detectar cuando se agregan imágenes nuevas
const observer = new MutationObserver(() => {
    cargarImagenesYAjustarMargen();
});

const container = document.querySelector('.container-productos');
if(container){
    observer.observe(container, { childList: true, subtree: true });
}


function crearElemento(tipo, propiedades) {
    const elemento = document.createElement(tipo);
    Object.keys(propiedades).forEach(propiedad => {
        elemento[propiedad] = propiedades[propiedad];
    });
    return elemento;
}