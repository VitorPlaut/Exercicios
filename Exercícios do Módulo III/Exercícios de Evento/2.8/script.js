const painel = document.querySelector('#painel');
const btn = document.querySelector('#btn');
let visibilidade = false;

btn.addEventListener('click', (e) => {
    visibilidade  = !visibilidade;

    if(visibilidade){
        painel.style.display = 'block';
    } else{
        painel.style.display = 'none';
    };


});

