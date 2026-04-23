async function verificaLogin() {

   const userLogged = await userDados()
 
  if(!userLogged){

    navegacao('cadastroUser')

  }else if(userLogged){

   
    if(userLogged.logged){
 //se estiver logado....
    navegacao('avisoRedirecionamento')
      setTimeout(() =>{ 
window.location.href = "home.html";
    }, 500);
    }else{
      
        const userNome = document.getElementById('inputNome')
        const userTel = document.getElementById('inputTel')
        userNome.value = userLogged.nome
        userTel.value = userLogged.tel
        navegacao('cadastroUser')
      return
    }

  }else{
    navegacao('cadastroUser')
  }
  
}
verificaLogin()

function navegacao(open) {
  
  window.scrollTo({
      top: 0,
      behavior: 'auto'
  })
      
  const allSections=["avisoRedirecionamento","cadastroUser"]
  
  allSections.forEach(sec =>{
   
    document.getElementById(sec).classList.add('hidden')
    
  })
  document.getElementById(open).classList.remove('hidden')
}
 document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});

//////////////////////////////////
////////////////////.//////////////

async function enviaCadastroUser(e,metodo) {
const usuario = await userDados()
  e.preventDefault()

const userNome = document.getElementById('inputNome')
const userTel = document.getElementById('inputTel')

  const gerarID = () => {
    const letras = Math.random().toString(36).substring(2, 4).toUpperCase();
    const data = Date.now();
    return letras + data;
};

if(metodo ==='cadastrar'){
  
if (usuario){

usuario.logged = true

 localStorage.setItem('userDados',JSON.stringify(usuario))
  window.location.reload()
  
}else{
  async function cadastrarUser() {

const usuarioCompleto = {
    id:gerarID(),
    nome: userNome.value,
    tel: userTel.value,
    rua:'',
    casa:'',
    bairro:'',
    complemento:'',
    logged: true,
    pontos:0
  }
    localStorage.setItem('userDados',JSON.stringify(usuarioCompleto))
  }
  cadastrarUser()
}
  
 window.location.reload()
    
}else if(metodo ==='editar'){
  

    }
}
//////////////////////////////////
////////editar cadastro//////////
////////////////////.//////////////
async function editaCadastroUser() {

  const userdados = await userDados()
  
   document.getElementById('editNome').value=userdados.nome
  document.getElementById('editTel').value=userdados.tel
  

}
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
