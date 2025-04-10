function searchProduct() {
    const query = document.getElementById('search').value;
    alert('Buscando: ' + query);
}


// navbar.js
document.addEventListener('DOMContentLoaded', function () {
    // Usamos fetch() para cargar el archivo 'navbar.html'
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la barra de navegación');
            }
            return response.text();
        })
        .then(data => {
            // Colocamos el contenido de navbar.html dentro del div con id 'navbar'
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => {
            console.error(error);
        });
});

// hamburger-menu.js
function toggleMenu() {
    const navbar = document.getElementById("myNavbar");
    navbar.classList.toggle("responsive");
    
    // Cerrar el menú al hacer clic en un enlace (solo en móviles)
    if (window.innerWidth <= 768) {
        const links = navbar.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("responsive");
            });
        });
    }
}

// Cerrar el menú al redimensionar la pantalla si es mayor a 768px
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        const navbar = document.getElementById("myNavbar");
        navbar.classList.remove("responsive");
    }
});

// barra-busqueda.js (o el archivo donde tienes tu función searchProduct en la página principal)



 