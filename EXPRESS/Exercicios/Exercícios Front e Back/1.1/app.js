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
        database: "teste_db"
    });
}

app.get("/api/tarefas", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            "SELECT * FROM tarefas ORDER BY id"
        );

        res.status(200).json(resultado.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar tarefas"
        });

    } finally {
        await client.end();
    }
});

app.post("/api/tarefas", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            "INSERT INTO tarefas (titulo, concluida) VALUES ($1, $2) RETURNING *",
            [req.body.titulo, req.body.concluida]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            erro: "Erro ao cadastrar tarefa"
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