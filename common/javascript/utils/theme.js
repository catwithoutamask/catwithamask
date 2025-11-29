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
    const year = (new Date()).getFullYear();
    document.getElementsByTagName("footer")[0].innerHTML = "<p>© "+ year +" Catwithamask. All rights reserved.</p>";
    console.log(document.getElementsByTagName("footer"))
});

window.addEventListener('scroll', function(){
    let value = window.scrollY;

    if(value == 0) {
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
    }
});