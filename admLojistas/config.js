let memoria
// Função auxiliar para gerenciar o salvamento
function salvarNoCache(dados) {
  // Puxa o que já tem no cache ou cria um array vazio
  memoria = JSON.parse(localStorage.getItem('cadastroLogista')) || [];
  
  // Adiciona os novos dados ao array existente
  memoria.push(dados);
  
  // Salva de volta no localStorage (sempre como String)
  localStorage.setItem('cadastroLogista', JSON.stringify(memoria));
}

function registraLogista(){
  const dadosLogista = {
    nome: document.getElementById('adm_nome').value,
    email: document.getElementById('adm_email').value,
    telefone: document.getElementById('adm_telefone').value,
    plano: document.getElementById('adm_plano').value
  };
  
  salvarNoCache(dadosLogista);
//  alert(JSON.stringify(memoria))
}

function registraLoja() {
  const dadosLoja = {
    comercio: document.getElementById('nome_comercio').value,
    link: document.getElementById('slug').value,
    whatsapp: document.getElementById('whatsapp').value,
    // ... adicione os outros campos aqui
  };
  
  salvarNoCache(dadosLoja);
}

function irPara(url) {
  // 1. Salva os dados da tela atual antes de sair
  
  // 2. Agora sim, muda de página
  window.location.href = url;
}
