const campo = document.querySelector('#campo');

campo.addEventListener('input', (e) => {
    const texto = e.target.value; 
  
    document.querySelector('#contagem').textContent = texto.length + ' caracteres';
  });