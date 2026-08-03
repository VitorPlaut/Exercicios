import promptSync from "prompt-sync";
import chalk from "chalk";

const prompt = promptSync();

const personagem = prompt("Qual é o nome do seu personagem? ");
const classe = prompt("Qual é a classe? ");
const nivel = Number(prompt("Qual é o nível? "));

if (personagem.trim() === "") {
    console.log(chalk.red("Erro: O nome não pode estar vazio."));
    process.exit();
}

if (classe.trim() === "") {
    console.log(chalk.red("Erro: A classe não pode estar vazia."));
    process.exit();
}

if (Number.isNaN(nivel) || nivel <= 0) {
    console.log(chalk.red("Erro: Digite um nível válido."));
    process.exit();
}

const hp = nivel * 10;

let rank;

if (nivel >= 1 && nivel <= 10) {
    rank = "Recruta";
} else if (nivel >= 11 && nivel <= 20) {
    rank = "Veterano";
} else {
    rank = "Lendário";
}

const ficha = `
${chalk.cyan("====================================")}
${chalk.yellow.bold("      ⚔️ FICHA DO PERSONAGEM")}
${chalk.cyan("====================================")}
${chalk.green("Nome:")}      ${personagem}
${chalk.green("Classe:")}    ${classe}
${chalk.green("Nível:")}     ${nivel}
${chalk.green("HP:")}        ${hp}
${chalk.green("Rank:")}      ${rank}
${chalk.cyan("====================================")}
`;

console.log(ficha);