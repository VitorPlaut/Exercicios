import express from 'express';
import pg from 'pg';

function criarCliente() {
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: 'root',
        database: 'teste_db'
    });
}

app.get('/api/tarefas', async (req,res) )


