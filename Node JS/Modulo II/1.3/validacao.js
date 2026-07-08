function validarNome(nome){
if(typeof nome === "string" && nome.length > 3){
console.log(`Nome: ${nome}`);
} else {
    console.log("Digite uma letra ou um nome maior que 3 letras!!");
}
}

function validarIdade(idade){
if(idade > 0){
    console.log(`Idade: ${idade}`)
} else {
    console.log(`Idade: ${idade} tem que ser maior que 0!`);

}

}

module.exports = {
     validarNome,
     validarIdade 
};