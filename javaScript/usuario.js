function toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    const isVisible = menu.style.display === 'block';

    // Ocultar el menú si ya está visible, mostrarlo si está oculto
    menu.style.display = isVisible ? 'none' : 'block';

    // Guardar el estado del menú en el almacenamiento local
    localStorage.setItem('menuVisible', !isVisible);
}

// Al cargar la página, siempre oculta el menú
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('user-menu');
    menu.style.display = 'none';
});

function logout() {
    alert('Sesión cerrada correctamente.');
    window.location.href = "../HTML/inicio-sesion.html";
}