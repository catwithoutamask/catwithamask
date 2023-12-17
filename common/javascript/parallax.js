let lines;
let sun;
let stars;
let layer1;
let layer2;
let layer3;
let header;

document.addEventListener('DOMContentLoaded', () => {
    lines = document.getElementById('lines');
    sun = document.getElementById('sun');
    stars = document.getElementById('stars');
    layer1 = document.getElementById('layer-1');
    layer2 = document.getElementById('layer-2');
    layer3 = document.getElementById('layer-3');
    header = document.getElementById('header');
});

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    lines.style.bottom = (value * -0.10) + '%';
    stars.style.bottom = (value * -0.05) + '%';
    sun.style.bottom = (value * (-0.3)) + 'px';
    layer1.style.bottom = (value * (-0.5)) + 'px';
    layer2.style.bottom = (value * (-0.25)) + 'px';
    layer3.style.bottom = (value * (-0.15)) + 'px';

    header.style.top = value * 0.5 + 'px';
});