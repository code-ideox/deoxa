document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const mainHeader = document.querySelector('.main-header');
    const content = document.querySelector('.content');

    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('closed');
        mainHeader.classList.toggle('closed'); // Cambiar la clase del menú principal
        content.classList.toggle('closed'); // Cambiar la clase del contenido principal
    });
});
