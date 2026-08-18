import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

const app = express();

app.use(express.json());
app.use(express.static('public'));

function criarCliente() {
    return new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'root',
        database: 'games_db'
    });
}

// ─────────────────────────────────────────
// GET — listar todos os jogos com JOIN
// ─────────────────────────────────────────
app.get('/api/jogos', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(`
            SELECT
                j.id,
                j.titulo,
                j.preco,
                j.nota,
                j.ano,
                p.nome    AS plataforma,
                p.empresa AS empresa,
                c.nome    AS categoria
            FROM jogos j
            INNER JOIN plataformas p ON j.plataforma_id = p.id
            INNER JOIN categorias  c ON j.categoria_id  = c.id
            ORDER BY j.titulo
        `);
        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// ─────────────────────────────────────────
// GET — buscar jogo por ID com JOIN
// ─────────────────────────────────────────
app.get('/api/jogos/:id', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(`
            SELECT
                j.id,
                j.titulo,
                j.preco,
                j.nota,
                j.ano,
                p.nome AS plataforma,
                c.nome AS categoria
            FROM jogos j
            INNER JOIN plataformas p ON j.plataforma_id = p.id
            INNER JOIN categorias  c ON j.categoria_id  = c.id
            WHERE j.id = $1
        `, [req.params.id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Jogo não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// ─────────────────────────────────────────
// GET — listar plataformas (para popular o select)
// ─────────────────────────────────────────
app.get('/api/plataformas', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(
            'SELECT * FROM plataformas ORDER BY nome'
        );
        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// ─────────────────────────────────────────
// GET — listar categorias (para popular o select)
// ─────────────────────────────────────────
app.get('/api/categorias', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(
            'SELECT * FROM categorias ORDER BY nome'
        );
        res.json(resultado.rows);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// ─────────────────────────────────────────
// POST — cadastrar jogo
// ─────────────────────────────────────────
app.post('/api/jogos', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const { titulo, preco, nota, ano, plataforma_id, categoria_id } = req.body;

        if (!titulo || !preco || !plataforma_id || !categoria_id) {
            return res.status(400).json({
                erro: 'Título, preço, plataforma e categoria são obrigatórios'
            });
        }

        const resultado = await client.query(`
            INSERT INTO jogos (titulo, preco, nota, ano, plataforma_id, categoria_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [titulo, preco, nota, ano, plataforma_id, categoria_id]);

        res.status(201).json(resultado.rows[0]);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// ─────────────────────────────────────────
// DELETE — remover jogo
// ─────────────────────────────────────────
app.delete('/api/jogos/:id', async (req, res) => {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(
            'DELETE FROM jogos WHERE id = $1 RETURNING titulo',
            [req.params.id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Jogo não encontrado' });
        }
        res.json({ mensagem: `"${resultado.rows[0].titulo}" removido com sucesso` });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    } finally {
        await client.end();
    }
});

// ─────────────────────────────────────────
// INICIAR SERVIDOR
// ─────────────────────────────────────────
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

