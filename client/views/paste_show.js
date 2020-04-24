import {THEMES} from "../themes.js"
import {LANGUAGES} from "../languages.js"
import {getCookie, setCookie} from "../cookies.js"

const themeChosen = getCookie("theme") || THEMES.default

function renderLineNumbers() {
    const block = document.querySelectorAll('pre code.hljs')[1];
    const lineNumbers = document.querySelectorAll('pre code.hljs')[0]
    const rawCode = block.innerHTML;
    const lines = rawCode.split("\n")
    let arr = Array.from({length: lines.length}, (v, k) => k+1)
    lineNumbers.innerHTML = arr.join("\n")
}

function fixupUI(theme) {
    let data = THEMES.find((t) => t.file === theme)
    document.body.classList.toggle("dark", data.dark)
    document.body.classList.toggle("light", !data.dark)
}

const pasteShow = () => {
    const themesEl = document.getElementById("themes")
    for (let el of themesEl.childNodes) {
        el.remove();
    }
    for (let theme of THEMES) {
        let option = document.createElement("option")
        if (themeChosen == theme.file) {
            option.selected = true;
        }
        option.value = `${theme.file}`;
        option.innerHTML = theme.name;
        themesEl.appendChild(option);
    }

    fixupUI(themesEl.value)


    // let group = document.createElement("optgroup")
    // group.label = "Normal"
    // themesEl.appendChild(group);
    // let option = document.createElement("option")
    // option.innerHTML="Testing"
    // group.appendChild(option)

    // group = document.createElement("optgroup")
    // group.label = "Others"
    // themesEl.appendChild(group);
    // for (let theme of THEMES) {
    //     let option = document.createElement("option")
    //     if (themeChosen == theme.file) {
    //         option.selected = true;
    //     }
    //     option.value = `${theme.file}`;
    //     option.innerHTML = theme.name;
    //     group.appendChild(option);
    // }

    renderLineNumbers();

    // [].forEach.call(blocks, hljs.highlightBlock);
    const code = document.querySelectorAll('pre code.hljs')[1];
    hljs.highlightBlock(code);
    // const lang = document.getElementById("language")
    // lang.innerHTML = LANGUAGES[code.result.language] || code.result.language;


    themesEl.addEventListener("change", (event) => {
        var theme = document.getElementById("hljsTheme")
        if (event.target.value==="")
            return;
        theme.href = `/css/v/${event.target.value}`;

        fixupUI(event.target.value)
        setCookie("theme", event.target.value, {until: Infinity})
    })
}

export { pasteShow }