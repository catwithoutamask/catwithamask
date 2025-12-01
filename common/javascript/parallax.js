let lines;
let sun;
let stars;
let layer1;
let layer2;
let layer3;
let layer4;
let red1;
let itsnow = false;
let hohoho = false

document.addEventListener('DOMContentLoaded', () => {
    lines = document.getElementById('lines');
    sun = document.getElementById('sun');
    stars = document.getElementById('stars');
    red1 =  document.getElementById('red-1');
    layer1 = document.getElementById('layer-1');
    layer2 = document.getElementById('layer-2');
    layer3 = document.getElementById('layer-3');
    layer4 = document.getElementById('layer-4');

    checkforchristmas();
    fitToViewportHeight(layer4);
    fitToViewportHeight(red1);
});

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    lines.style.bottom = (value * -0.10) + '%';
    stars.style.bottom = (value * -0.05) + '%';
    sun.style.bottom = (value * (-0.3)) + 'px';
    layer1.style.bottom = (value * (-0.5)) + 'px';
    layer2.style.bottom = (value * (-0.25)) + 'px';
    layer3.style.bottom = (value * (-0.15)) + 'px';
});

function switchThemeParallax() {
    const sun_moon =  document.getElementById('sun');
    const layer4 = document.getElementById('layer-4');
    const stars =  document.getElementById('stars');
    const red1 =  document.getElementById('red-1');
    const red2 =  document.getElementById('red-2');

    const displayImage = document.getElementById('toggleme');
    
    if(lightTheme) {
        sun_moon.setAttribute('src', "../assets/parallax/sun.png");
        if(itsnow) {
            layer4.setAttribute('src', "../assets/parallax/winter/layer-4.webp");
        } else if (hohoho) {
            layer4.setAttribute('src', "../assets/parallax/winter/layer-4-xmas.webp");
        } else {
            layer4.setAttribute('src', "../assets/parallax/layer-4.png");
        }
        displayImage.setAttribute('src', "../assets/gallery/images/da74be0f-e553-4ea8-b541-d8eab8ac68d3.png");
        red1.classList.remove('active');
        red2.classList.remove('active');
        stars.classList.remove('active');
    }else {
        sun_moon.setAttribute('src', "../assets/parallax/moon.png");
        if(itsnow) {
            layer4.setAttribute('src', "../assets/parallax/winter/layer-4-dark.webp");
        } else if (hohoho) {
            layer4.setAttribute('src', "../assets/parallax/winter/layer-4-dark-xmas.webp");
        } else {
            layer4.setAttribute('src', "../assets/parallax/layer-4-dark.png");
        }
        displayImage.setAttribute('src', "../assets/gallery/images/fd21a2ae-bc3f-4c51-b972-90c0709945fa.png");
        red1.classList.add('active');
        red2.classList.add('active');
        stars.classList.add('active');
    }
}

function checkforchristmas() {
    const today = new Date();
    const red1 =  document.getElementById('red-1');
    console.log(today.getMonth());

    if(today.getMonth() == 10 || today.getMonth() < 2) {
        itsnow = true
        layer1.setAttribute('src', "../assets/parallax/winter/layer-1.webp");
        layer2.setAttribute('src', "../assets/parallax/winter/layer-2.webp");
        layer3.setAttribute('src', "../assets/parallax/winter/layer-3.webp");
        layer4.setAttribute('src', "../assets/parallax/winter/layer-4.webp");
        red1.setAttribute('src', "../assets/parallax/winter/red-1.webp");
    } else if(today.getMonth() == 11) {
        hohoho = true
        layer3.setAttribute('src', "../assets/parallax/winter/layer-3-xmas.webp");
        layer4.setAttribute('src', "../assets/parallax/winter/layer-4-xmas.webp");
        red1.setAttribute('src', "../assets/parallax/winter/red-1.webp");
    }
}

function fitToViewportHeight(img) {
  const vh = window.innerHeight;
  const scale = vh / img.naturalHeight;
  const renderWidth = img.naturalWidth * scale;

  img.style.height = vh + 'px';
  img.style.width = 'auto';
  img.style.left = (window.innerWidth - renderWidth) + 'px';

  console.log("vh:", vh);
  console.log("scale:", scale);
  console.log("renderWidth:", renderWidth);
  console.log("window width:", window.innerWidth);
  console.log("left:", img.style.left);
}

window.addEventListener('resize', () => {
    fitToViewportHeight(layer4);
    fitToViewportHeight(red1);
});