document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('totop')
    document.addEventListener('scroll', function () { toggle_totop(button) });
    // document.getElementById('totop').addEventListener('', function () { toggle_totop(this) });
});

function toggle_totop(element) {
    let currentscroll = window.scrollY;
    if(currentscroll > 0){
        element.classList.remove('none')
    }
    else {
        element.classList.add('none')
    }
}