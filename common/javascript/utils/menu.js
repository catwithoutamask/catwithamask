let toggleMenu;
let navigation;
   
document.addEventListener('DOMContentLoaded', () => {
    toggleMenu = document.querySelector('.toggle');
    navigation = document.querySelector('.navigation');
});

function menuToggle() {
    toggleMenu.classList.toggle('active');
    navigation.classList.toggle('active');
}