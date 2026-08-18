import http from 'http';
import fs, { readFile } from 'fs';

const servidor = http.createServer((req, res) => {

    fs.readFile('index.html', (erro, dados) => {

        if (erro) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro ao carregar o arquivo.');
            return;
        }

        if (req.url === '/') {
            readFile(res, 'index.html');
        }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(dados);

    });

});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});