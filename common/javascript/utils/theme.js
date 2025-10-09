let lightTheme = true;
let header;
function switchTheme(ele = document.getElementById('theme-switcher'), theme = !lightTheme) {
    lightTheme = theme;
    document.documentElement.dataset.theme = lightTheme ? 'light' : 'dark';   

    if(ele.classList.contains('parallax-switcher')){
        switchThemeParallax();
    }

    if(lightTheme) {
        ele.classList.remove('dark');
        document.getElementById('hamburger').classList.remove('dark');
        document.getElementsByTagName("body")[0].classList.remove('dark'); 
        setCookie('theme', 'light', 720);
    }else {
        ele.classList.add('dark');
        document.getElementById('hamburger').classList.add('dark');
        document.getElementsByTagName("body")[0].classList.add('dark'); 
        setCookie('theme', 'dark', 720);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const theme = getCookie('theme');
    if(theme != "") {
        switchTheme(document.getElementById('theme-switcher'), theme === "light")
    }
    header = document.getElementById('header');
    document.getElementById('theme-switcher').addEventListener('click', function () { switchTheme(this) });
});

function switchThemeParallax() {
    const sun_moon =  document.getElementById('sun');
    const layer3 =  document.getElementById('layer-3');
    const layer4 =  document.getElementById('layer-4');

    const stars =  document.getElementById('stars');
    const red1 =  document.getElementById('red-1');
    const red2 =  document.getElementById('red-2');

    const displayImage = document.getElementById('toggleme');
    
    if(lightTheme) {
        sun_moon.setAttribute('src', "../assets/parallax/sun.png");
        layer3.setAttribute('src', "../assets/parallax/layer-3.png");
        layer4.setAttribute('src', "../assets/parallax/layer-4.png");
        displayImage.setAttribute('src', "../assets/gallery/images/da74be0f-e553-4ea8-b541-d8eab8ac68d3.png");
        red1.classList.remove('active');
        red2.classList.remove('active');
        stars.classList.remove('active');
    }else {
        sun_moon.setAttribute('src', "../assets/parallax/moon.png");
        layer4.setAttribute('src', "../assets/parallax/layer-4-dark.png");
        displayImage.setAttribute('src', "../assets/gallery/images/fd21a2ae-bc3f-4c51-b972-90c0709945fa.png");
        red1.classList.add('active');
        red2.classList.add('active');
        stars.classList.add('active');
    }
}

window.addEventListener('scroll', function(){
    let value = window.scrollY;

    if(value == 0) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
});