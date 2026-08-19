import express from "express";
import { Client } from "pg";

const app = express();

const PORTA = 3000;

app.use(express.json());
app.use(express.static("public"));

function criarCliente() {
    return new Client({
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "root",
        database: "cardapio_db"
    });
}

app.get("/api/pratos", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`
            SELECT
                pratos.id,
                pratos.nome,
                pratos.descricao,
                pratos.preco,
                pratos.disponivel,
                categorias.id AS categoria_id,
                categorias.nome AS categoria
            FROM pratos
            INNER JOIN categorias
                ON pratos.categoria_id = categorias.id
            ORDER BY pratos.id
        `);

        res.status(200).json(resultado.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar pratos"
        });

    } finally {
        await client.end();
    }
});

app.get("/api/pratos/:id", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(`
            SELECT
                pratos.id,
                pratos.nome,
                pratos.descricao,
                pratos.preco,
                pratos.disponivel,
                categorias.id AS categoria_id,
                categorias.nome AS categoria
            FROM pratos
            INNER JOIN categorias
                ON pratos.categoria_id = categorias.id
            WHERE pratos.id = $1
        `, [req.params.id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Prato não encontrado"
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar prato"
        });

    } finally {
        await client.end();
    }
});

app.get("/api/categorias", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            "SELECT * FROM categorias ORDER BY id"
        );

        res.status(200).json(resultado.rows);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar categorias"
        });

    } finally {
        await client.end();
    }
});

app.post("/api/pratos", async (req, res) => {
    const client = criarCliente();

    const {
        nome,
        descricao,
        preco,
        disponivel,
        categoria_id
    } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        });
    }

    if (preco === undefined || preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero"
        });
    }

    if (!categoria_id) {
        return res.status(400).json({
            erro: "Categoria é obrigatória"
        });
    }

    try {
        await client.connect();

        const resultado = await client.query(
            `INSERT INTO pratos
                (nome, descricao, preco, disponivel, categoria_id)
             VALUES
                ($1, $2, $3, $4, $5)
             RETURNING *`,
            [
                nome,
                descricao,
                preco,
                disponivel ?? true,
                categoria_id
            ]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.log(error);

        if (error.code === "23503") {
            return res.status(400).json({
                erro: "Categoria não encontrada"
            });
        }

        res.status(500).json({
            erro: "Erro ao cadastrar prato"
        });

    } finally {
        await client.end();
    }
});

app.put("/api/pratos/:id", async (req, res) => {
    const client = criarCliente();

    const {
        nome,
        descricao,
        preco,
        disponivel,
        categoria_id
    } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        });
    }

    if (preco === undefined || preco <= 0) {
        return res.status(400).json({
            erro: "Preço deve ser maior que zero"
        });
    }

    if (!categoria_id) {
        return res.status(400).json({
            erro: "Categoria é obrigatória"
        });
    }

    try {
        await client.connect();

        const resultado = await client.query(
            `UPDATE pratos
             SET nome = $1,
                 descricao = $2,
                 preco = $3,
                 disponivel = $4,
                 categoria_id = $5
             WHERE id = $6
             RETURNING *`,
            [
                nome,
                descricao,
                preco,
                disponivel ?? true,
                categoria_id,
                req.params.id
            ]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Prato não encontrado"
            });
        }

        res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.log(error);

        if (error.code === "23503") {
            return res.status(400).json({
                erro: "Categoria não encontrada"
            });
        }

        res.status(500).json({
            erro: "Erro ao atualizar prato"
        });

    } finally {
        await client.end();
    }
});

app.delete("/api/pratos/:id", async (req, res) => {
    const client = criarCliente();

    try {
        await client.connect();

        const resultado = await client.query(
            "DELETE FROM pratos WHERE id = $1 RETURNING *",
            [req.params.id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                erro: "Prato não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Prato removido com sucesso",
            prato: resultado.rows[0]
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            erro: "Erro ao remover prato"
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