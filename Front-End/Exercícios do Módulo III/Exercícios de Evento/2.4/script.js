const btns = document.querySelectorAll('button');
const caixa = document.querySelector('#caixa');

btns.forEach(btns => {
    btns.addEventListener('click', (e) => {
      const cor = e.target.dataset.cor;
      caixa.style.background = cor;
      
    });
  });