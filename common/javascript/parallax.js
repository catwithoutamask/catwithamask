let lines;
let sun;
let stars;
let layer1;
let layer2;
let layer3;
let layer4;

document.addEventListener('DOMContentLoaded', () => {
    lines = document.getElementById('lines');
    sun = document.getElementById('sun');
    stars = document.getElementById('stars');
    layer1 = document.getElementById('layer-1');
    layer2 = document.getElementById('layer-2');
    layer3 = document.getElementById('layer-3');
    layer4 = document.getElementById('layer-4');
    fitToViewportHeight(layer4)
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

function fitToViewportHeight(img) {
  const vh = window.innerHeight;
  const scale = vh / img.naturalHeight;
  const renderWidth = img.naturalWidth * scale;
  img.style.height = vh + 'px';
  img.style.width = 'auto';
  img.style.left = (window.innerWidth - renderWidth) + 'px';
}

window.addEventListener('resize', () => fitToViewportHeight(layer4));
