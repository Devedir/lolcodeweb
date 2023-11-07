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
    document.getElementById("logtext").innerHTML = "[ CONSOLE ]";
    document.getElementById("logtext").style.color = "black";
}

function changeTheme() {
    for (let codeHandle of document.getElementsByTagName("textarea")) {
        if (isDark) {
            codeHandle.classList.replace("dark", "light");
            document.getElementById("theme").innerHTML = "BLACK CAT";
        } else {
            codeHandle.classList.replace("light", "dark");
            document.getElementById("theme").innerHTML = "WHITE CAT";
        }
    }
    isDark = !isDark;
}