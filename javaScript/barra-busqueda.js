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

