import http from 'http';

const servidor= http.createServer((req, res) => {
 
    console.log('URL acessada:', req.url);
    console.log('Método:', req.method);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Verifique o terminal!');

});

servidor.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});