const SKIP_BUILD = ["html"]
const languages = {
    // common
    apache: "Apache Config",
    bash: "Bash",
    cpp: "C / C++",
    csharp: "C#",
    coffeescript: "CoffeeScript",
    css: "CSS",
    diff: "Diff",
    elixir: "Elixir",
    go: "Go",
    html: "HTML", // alias of XML
    // http: "HTTP",
    ini: "INI / TOML",
    java: "Java",
    javascript: "JavaScript",
    json: "JSON",
    kotlin: "Kotlin",
    lua: "Lua",
    less: "Less",
    makefile: "Makefile",
    markdown: "Markdown",
    nginx: "Nginx Config",
    objectivec: "Objective-C",
    properties: "Properties",
    perl: "Perl",
    plaintext: "Text",
    python: "Python",
    php: "PHP",
    rust: "Rust",
    ruby: "Ruby",
    // shell: "Shell",
    sql: "SQL",
    swift: "Swift",
    scss: "SCSS",
    typescript: "TypeScript",
    xml: "XML",
    yaml: "YAML",
}

module.exports = { LANGUAGES: languages, skipBuild: SKIP_BUILD }