import http from 'http';

const servidor = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (req.url === '/') {
        res.end('<h1>Página Inicial</h1>');
    }

    else if (req.url === '/sobre') {
        res.end('<h1>Sobre</h1><p>Esta é a página sobre.</p>');
    }

    else if (req.url === '/contato') {
        res.end('<h1>Contato</h1><p>Entre em contato conosco.</p>');
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 — Página não encontrada</h1>');
    }

});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});