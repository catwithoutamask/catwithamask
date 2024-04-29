function login() {
    document.getElementById("username").classList.add("error");
    document.getElementById("username").value = "";
    document.getElementById("pw").classList.add("error");
    document.getElementById("pw").value = "";

    document.getElementById("error-msg").innerHTML = "Username or password incorrect!";
    document.getElementById("error-msg").classList.add("display");
}