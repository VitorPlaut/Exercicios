let nomeItem = process.argv[2];
let preco = process.argv[3];
let ouro = process.argv[4];


if(ouro >= preco){
    let quantidade = ouro - preco;
    console.log("Você comprou:", nomeItem, `\tSobrou ${quantidade} de ouro!`);

} else if (ouro < preco){
    let quantidade = preco - ouro;
    console.log(`Ouro insuficiente! Faltam: ${quantidade} para comprar a ${nomeItem}`);
}