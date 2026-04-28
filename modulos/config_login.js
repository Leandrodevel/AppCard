
async function verificarLogin() {
    const dados = await userDados();
    if(dados){
   if(dados.logged === true){
    return dados.logged
    }else if(dados.logged !== 'home' ){
        
      openLogin() 
     return dados.logged
    }
    } else {
      openLogin()
        return dados.logged
    }
}
function openLogin(){
    document.getElementById('modalCadastro').classList.remove('hidden')
}
const toast = document.getElementById('toastSair');

if (!history.state) {
   history.pushState({ page: 1 }, "", "");
}