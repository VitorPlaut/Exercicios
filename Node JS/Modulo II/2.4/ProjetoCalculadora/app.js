const operacoes = require("./utils/operacoes");
const validacoes = require("./utils/validacoes");

const num1 = 10;
const num2 = 5;

if (validacoes.validarNumeros(num1, num2)) {

    operacoes.somar(num1, num2);
    operacoes.subtrair(num1, num2);
    operacoes.multiplicar(num1, num2);
    operacoes.divisao(num1, num2);

} else {

    console.log("Erro: um ou ambos os valores não são números.");

}