const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "banco_teste" 
});

async function main() {
    try {
        await client.connect();

        // Calcula a média da turma
        const media = await client.query(
            "SELECT AVG(nota) AS media FROM alunos"
        );

        const mediaTurma = media.rows[0].media;

        console.log("Média da turma:", Number(mediaTurma).toFixed(2));
        console.log("\nAlunos acima da média:");

        // Busca os alunos acima da média
        const alunos = await client.query(
            "SELECT nome, nota FROM alunos WHERE nota > $1",
            [mediaTurma]
        );

        alunos.rows.forEach(aluno => {
            console.log(`${aluno.nome} - ${aluno.nota}`);
        });

        console.log(`\n${alunos.rowCount} alunos acima da média.`);

    } catch (erro) {
        console.log("Erro:", erro.message);
    } finally {
        await client.end();
    }
}

main();