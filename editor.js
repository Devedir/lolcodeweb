// Z góry przepraszam za globala
let isDark = false;

function clearCode() {
    let codeHandle = document.getElementById("code");
    codeHandle.value = "";
    if (isDark)
        codeHandle.style.boxShadow = "0 0 0 4px white";
    else
        codeHandle.style.boxShadow = "0 0 0 2px black, 0 0 0 4px white";
    document.getElementById("logtext").innerHTML = "";
    document.getElementById("logtext").style.backgroundColor = "gainsboro";
    document.getElementById("catimg").src = "img/programmer.png";
}

function changeTheme() {
    let codeHandle = document.getElementById("code");
    if (isDark) {
        codeHandle.style.backgroundColor = "white";
        codeHandle.style.color = "black";
        codeHandle.style.boxShadow = "0 0 0 2px black, 0 0 0 4px white";
        document.getElementById("theme").innerHTML = "BLACK CAT";
    } else {
        codeHandle.style.backgroundColor = "#1a123d";
        codeHandle.style.color = "white";
        codeHandle.style.boxShadow = "0 0 0 4px white";
        document.getElementById("theme").innerHTML = "WHITE CAT";
    }
    isDark = !isDark;
}