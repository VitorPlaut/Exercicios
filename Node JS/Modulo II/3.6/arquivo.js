const fs = require("fs");

function criarArquivo(nome, conteudo) {
    fs.writeFileSync(nome, conteudo);
}

function lerArquivo(nome) {
    return fs.readFileSync(nome, "utf8");
}

module.exports = {
    criarArquivo,
    lerArquivo
};