const usuarios = [];

function criarUsuario (nome,idade){
    const usuario = {
        nome,
        idade
    };
        usuarios.push(usuario);

}

function listarUsuarios(){
    return usuarios;
}

module.exports ={
    criarUsuario,
    listarUsuarios
}
