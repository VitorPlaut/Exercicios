const { Client } = require('pg');
const prompt = require('prompt-sync')();

// Configuração da conexão
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'banco_teste' // ou banco_teste, se foi nele que você criou a tabela
});

async function main() {
    try {
        // Conecta ao banco
        await client.connect();
        console.log("✅ Conectado ao PostgreSQL!");

        // Consulta o total de alunos
        const total = await client.query("SELECT COUNT(*) FROM alunos");

        // Consulta a média das notas
        const media = await client.query("SELECT AVG(nota) FROM alunos");

        // Exibe os resultados
        console.log("Total de alunos:", total.rows[0].count);
        console.log("Média geral da turma:", media.rows[0].avg);

    } catch (erro) {
        console.log("❌ Erro:", erro.message);
    } finally {
        // Fecha a conexão
        await client.end();
        console.log("🔌 Conexão encerrada.");
    }
}

// Executa a função principal
main();