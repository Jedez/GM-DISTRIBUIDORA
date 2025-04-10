document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchForm = document.getElementById('search-form');

    if (searchInput && searchForm) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                searchForm.submit();
            }
        });
    } else {
        console.error("No se encontraron los elementos de búsqueda o el formulario en la página principal.");
    }
});