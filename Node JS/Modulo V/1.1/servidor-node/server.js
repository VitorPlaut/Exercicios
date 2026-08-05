import http from 'http';

const servidor = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Servidor funcionando!</h1>');
});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});