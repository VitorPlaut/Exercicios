import express from "express";
import { Client } from "pg";

const app = express();

const PORTA = 3000;

app.use(express.json());

function criarCliente() {
    return new Client({
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "root",
        database: "filmes_db"
    });
}

app.get("/api/filmes", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            "SELECT * FROM filmes ORDER BY titulo"
        );

        res.json(resultado.rows);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar filmes"
        });

    } finally {
        await client.end();
    }
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada"
    });
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});