const { Client } = require('pg');
const prompt = require('prompt-sync')();

// Configuração da conexão
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'banco_teste' 
});

async function main() {
    try {
        await client.connect();
        console.log("✅ Conectado ao PostgreSQL!");

        // Consulta o total de alunos
        const total = await client.query("SELECT COUNT(*) FROM alunos");

        const media = await client.query("SELECT AVG(nota) FROM alunos");

        console.log("Total de alunos:", total.rows[0].count);
        console.log("Média geral da turma:", media.rows[0].avg);

    } catch (erro) {
        console.log("❌ Erro:", erro.message);
    } finally {
        await client.end();
        console.log("🔌 Conexão encerrada.");
    }
}

main();