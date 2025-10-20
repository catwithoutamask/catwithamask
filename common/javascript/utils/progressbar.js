document.addEventListener('DOMContentLoaded', () => {
    let bar = document.getElementById('progress-bar');
    document.addEventListener('scroll', function () { show_progress(bar) });
});

function show_progress(element) {
    let currentscroll = window.scrollY + window.innerHeight;
    let body = document.body, html = document.documentElement;
    let height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    let ratio = Math.min(Math.round(currentscroll / height * 100), 100);
    element.style.width = ratio + '%';
}