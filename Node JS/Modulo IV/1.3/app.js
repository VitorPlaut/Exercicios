import pg from "pg";
import promptSync from "prompt-sync";

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "banco_teste"
});

async function cadastrarAluno() {

    try {

        await client.connect();

        const nome = prompt("Digite seu nome: ");
        const turma = prompt("Digite sua turma: ");
        const nota = Number(prompt("Digite sua nota: "));

        if (nome.trim() === "") {
            console.log("Erro: O nome não pode estar vazio!");
            return;
        }

        if (Number.isNaN(nota) || nota < 0 || nota > 10) {
            console.log("Nota inválida.");
            return;
        }

        const resultado = await client.query(
            "INSERT INTO alunos (nome, turma, nota) VALUES ($1, $2, $3) RETURNING *",
            [nome, turma, nota]
        );

        console.log("Aluno cadastrado com sucesso!");
        console.log(resultado.rows[0]);

    } catch (erro) {

        console.log("Erro:", erro.message);

    } finally {

        await client.end();

    }
}

cadastrarAluno();