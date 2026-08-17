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
        password: "SUA_SENHA",
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

        res.status(200).json(resultado.rows);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar filmes"
        });

    } finally {
        await client.end();
    }
});

app.get("/api/filmes/:id", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            "SELECT * FROM filmes WHERE id = $1",
            [req.params.id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Filme não encontrado"
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            erro: "Erro ao buscar filme"
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