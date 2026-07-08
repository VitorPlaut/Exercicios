function somar (num1,num2){
    resultado = num1 + num2;
    console.log(`Resultado da soma: ${resultado}`);

}

function subtrair (num1,num2){
    resultado = num1 - num2;
    console.log(`Resultado da subtração: ${resultado}`);

}

function multiplicar (num1,num2){
    resultado = num1 * num2;
    console.log(`Resultado da multiplicação: ${resultado}`);

}

function divisao (num1,num2){
    resultado = num1 / num2;
    console.log(`Resultado da divisão: ${resultado}`);
}

module.exports = {
    somar,
    subtrair,
    multiplicar,
    divisao
}
