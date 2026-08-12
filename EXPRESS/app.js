import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(express.json());
app.use(express.static('public'));

function criarCliente() {
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: 'sua_senha',
        database: 'loja_db'
    });
}

// GET — listar todos com JOIN
app.get('/api/produtos', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(`
            SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria
            FROM produtos p
            INNER JOIN categorias c ON p.categoria_id = c.id
            ORDER BY p.nome
        `);
        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// GET — buscar por ID com JOIN
app.get('/api/produtos/:id', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(`
            SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria
            FROM produtos p
            INNER JOIN categorias c ON p.categoria_id = c.id
            WHERE p.id = $1
        `, [req.params.id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// GET — listar categorias
app.get('/api/categorias', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query('SELECT * FROM categorias ORDER BY nome');
        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// POST — cadastrar produto
app.post('/api/produtos', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const { nome, preco, estoque, categoria_id } = req.body;
        if (!nome || !preco || !categoria_id) {
            return res.status(400).json({ erro: 'Nome, preço e categoria são obrigatórios' });
        }
        const resultado = await client.query(`
            INSERT INTO produtos (nome, preco, estoque, categoria_id)
            VALUES ($1, $2, $3, $4) RETURNING *
        `, [nome, preco, estoque || 0, categoria_id]);
        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// PUT — atualizar produto
app.put('/api/produtos/:id', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const { nome, preco, estoque, categoria_id } = req.body;
        const resultado = await client.query(`
            UPDATE produtos
            SET nome         = COALESCE($1, nome),
                preco        = COALESCE($2, preco),
                estoque      = COALESCE($3, estoque),
                categoria_id = COALESCE($4, categoria_id)
            WHERE id = $5 RETURNING *
        `, [nome, preco, estoque, categoria_id, req.params.id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// DELETE — remover produto
app.delete('/api/produtos/:id', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(
            'DELETE FROM produtos WHERE id = $1 RETURNING nome',
            [req.params.id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json({ mensagem: `"${resultado.rows[0].nome}" removido com sucesso` });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});