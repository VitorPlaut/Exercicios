const caixa = document.querySelector('#caixa');
// const caica = document.querySelector('#caixa');

caixa.addEventListener('mouseover', () =>{

  caixa.style.background  = 'blue';
  caixa.style.borderColor = 'black';
  caixa.style.color       = 'white';
  caixa.textContent = '🐭 Mouse dentro!';

});

caixa.addEventListener('mouseout', () =>{

  caixa.style.background  = 'gray';
  caixa.style.borderColor = 'black';
  caixa.style.color       = 'black';
  caixa.textContent = '🐭 Mouse fora!';

});