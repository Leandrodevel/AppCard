let cadastroCompleto =[]

function irPara(open) {
  window.location.replace(open);
  registraLogista()
  alert(JSON.stringify(lojista))
}

function registraLogista(){
  
  const nome = document.getElementById('adm_nome').value
  const email = document.getElementById('adm_email').value
  const telefone = document.getElementById('adm_telefone').value
  const plano = document.getElementById('adm_plano').value
  
 const logista=[{
   nome:nome,
   email:email,
   telefone:telefone,
   plano:plano
 }]
  
}
function registraLoja() {
  const comercio_get = document.getElementById('nome_comercio').value
  const link = document.getElementById('slug').value
  const whatsapp = document.getElementById('whatsapp').value
  const tema = document.getElementById('instagram').value
  const endereco = document.getElementById('endereco_completo').value
  const cidade = document.getElementById('cidade').value
  const instagram = document.getElementById('instagram_url').value
  
  const comercio = [{
    comercio:comercio_get,
    link:link,
    whatsapp:whatsapp,
    tema: tema,
    endereco:endereco,
    cidade:cidade,
    instagram:instagram
  }]
  
}

