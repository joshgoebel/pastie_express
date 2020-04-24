import {getCookie, setCookie} from "../cookies.js"

const pasteNew = () => {
    document.getElementById("editor").focus()

    var lang = getCookie("language") || "plaintext";
    const pickLanguage = document.getElementById("language")
    pickLanguage.value = lang;
    pickLanguage.addEventListener("change", (event) => {
        setCookie("language", event.target.value, {until: Infinity});
    })
}

export { pasteNew }