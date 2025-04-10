document.addEventListener('DOMContentLoaded', function() {
    const regresarBtn = document.getElementById('regresarBtn');
    if (regresarBtn) { // Verifica si el botón existe
        regresarBtn.addEventListener('click', function() {
            window.history.back();
        });
    }
});