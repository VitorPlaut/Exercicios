const arquivo = require("./arquivo");

arquivo.criarArquivo(
    "log.txt",
    "Olá! Vai tomar no cu LULA e PT."
);

const conteudo = arquivo.lerArquivo("log.txt");

console.log(conteudo);