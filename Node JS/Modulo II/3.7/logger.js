const fs = require("fs");

function registrarLog(mensagem) {
    const dataHora = new Date().toLocaleString();
    const log = `[${dataHora}] ${mensagem}`;

    fs.appendFileSync("logs.txt", log + "\n");

    console.log(log); 
}

module.exports = {
    registrarLog
};