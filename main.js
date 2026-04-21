document.addEventListener('DOMContentLoaded', async () => {
    const user = await verificarLogin();

    if (user) {
        // Se estiver logado, mostramos o corpo da página
        document.body.classList.add('auth-ok');
        
        // Exemplo: Saudar o usuário no console ou interface
        console.log(`Sessão ativa para: ${user.nome || 'Usuário'}`);
    }
});
async function verificarLogin() {

    const dados = await userDados();
    
    // Verifica se os dados existem E se o campo logged é verdadeiro
    if (!dados || dados.logged !== true) {
        console.warn("Acesso negado: Usuário não está logado.");
        window.location.replace('index.html'); // .replace é melhor que .href pois remove a página atual do histórico (o usuário não consegue "voltar" para a página protegida)
        return false;
    }

    return dados;
}



let historicoPages = []
let ultimoIndex='home'
let paginaAtual


function navegacao(open) {
  
  if(paginaAtual){
    historicoPages.push(paginaAtual)
  }
  paginaAtual = open

  window.scrollTo({
      top: 0,
      behavior: 'auto'
  })
      
  const allSections=['home','cardapio','pageCarrinho','pagePromocao','montarEspetinho','perfilUser','editarUser','enderecoTemp']
  
  switch (open) {
    case 'home':
      listaTop20()
      break;
    case 'cardapioGrid':
      listaProdutos()
      break;
    case 'pagePromocao':
      listaProm()
      break;
    
    default:
      // Tab to edit
  }
  
  if( open === 'perfilUser'){

    const header = document.querySelector('header')
    header.classList.add('hidden')

  }else{
    
    document.querySelector('header').classList.remove('hidden')
  }
 
  if(open !=='cardapio'){
    
    document.getElementById('navCat').classList.remove('hidden')
  }
  if(open === 'home'|| open === 'cardapio'){
    
        document.getElementById('headerTools').classList.remove('hidden')
  } else {
    document.getElementById('headerTools').classList.add('hidden')

  }

  allSections.forEach(s =>{
    
    document.getElementById(s).classList.add('hidden')
    
  })
  document.getElementById(open).classList.remove('hidden')
}
navegacao('home')
function voltarPage() {
  //historico de paginas para voltar
  if ( historicoPages.length > 0) {
   const paginaAnterior = historicoPages.pop()
  paginaAtual = paginaAnterior 
  navegacao(paginaAnterior)
}}
 async function editarUser() {
    
  const userdados = await userDados()
  
  const editarNome = document.getElementById('editNome').value
  const editarTel = document.getElementById('editTel').value
  const editarId =userdados.id
  const editarLogged = true
  const pontosAtual=userdados.pontos;
  // Criamos um único objeto com as informações e a segurança
  const usuarioCompleto = {
    id: editarId,
    nome: editarNome,
    tel: editarTel,
    rua: userdados.rua,
    casa: userdados.casa,
    complemento: userdados.complemento,
    bairro: userdados.bairro,
    logged: editarLogged,
    pontos: pontosAtual
  }
  
  
  const confimacao = prompt('digite EDITAR') || ''
  
  if(confimacao.trim() ==='EDITAR'){
  
  localStorage.setItem('userDados',JSON.stringify(usuarioCompleto))

  navegacao('perfilUser')
  
  window.location.reload()
  
  }else{
  alert('palavra incorreta')
} 
}
async function exibeDadosHeader(){
const meusDados = await userDados()
const headerViewEndereco= document.getElementById('btnViewEndereco')
 headerViewEndereco.innerHTML=meusDados.nome
}
exibeDadosHeader()
const formatMoeda = (valor) => 
valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const headerTop = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Rolando para baixo - Esconde o header
      headerTop.classList.add('-translate-y-full');
    } else {
      // Rolando para cima - Mostra o header
      headerTop.classList.remove('-translate-y-full');
    }

    lastScrollY = currentScrollY;
  });
  
let meuCarrinho = JSON.parse(localStorage.getItem('carrinho')) || []
function atualizaContador() {
 
  meuCarrinho = JSON.parse(localStorage.getItem('carrinho')) || []

  let totItens = document.getElementById('qtd-itens')  
  let  totalCarrinho= meuCarrinho.reduce((acumulador, p) => {
    return acumulador + p.qtd;
}, 0); 
// O '0' é o valor inicial da soma
    totItens.innerText = totalCarrinho
      atualizarCarrinho()
}    
    atualizaContador()
    
async function atualizaPontos(total){
  const dataPontos = await userDados()
const newPontos= total * 0.
const dbAtualizado = {...dataPontos,pontos:dataPontos.pontos+newPontos}
//const dbAtualizado ={...dataBase, pontos:0}
localStorage.setItem('userDados',JSON.stringify(dbAtualizado))
}
async function logout() {
const confirma = confirm('deseja sair ?')

if(confirma){
const user = await userDados()
  user.logged = false
 localStorage.setItem('userDados',JSON.stringify(user))
   window.location.href = "index.html";
}
}

const barraDeBusca = document.getElementById('search-bar')
barraDeBusca.addEventListener('input', ()=>{
  
   // listaProdutos('',barraDeBusca.value,'')
    
    const buscaSugestao = dbProdutos.filter(sb=> sb.nome.toLowerCase().includes(barraDeBusca.value.toLowerCase())) || []
    
    const listaBusca = document.getElementById('listBusca')
   
   listaBusca.innerHTML =''
   
   buscaSugestao.forEach(bs=>{
     
     const optList = document.createElement('option')
     optList.className='bg-white'
     optList.innerText = bs.nome
     
     listaBusca.appendChild(optList)
       
   })    
})

function buscaProduto(termo) {
  
  const headerTools = document.querySelector('headerTools')
  
  
listaProdutos('',termo,'')
navegacao('cardapio')
}
function faixaAmarela(){
const marquee = document.getElementById('faixaTicker')
let marqueeText=`<div class="animate-ticker">

        🔥 CERVEJA GELADA EM MENOS DE 30 MINUTOS • COMPRE 5 LEVE 6 EM SKOL LATA • TAXA GRÁTIS ACIMA DE R$ 50,00 🔥
    </div> `;

 marquee.innerHTML = marqueeText;
}
faixaAmarela()
const instrucao =`
​"Olá! Seja muito bem-vindo(a) à Tricker! 🚀
​Ficamos muito felizes em ter você aqui. Para facilitar seu pedido, nosso cardápio funciona de forma automática e prática:
​Escolha: Navegue pelos nossos itens e selecione os seus favoritos.
​Carrinho: Adicione os itens ao carrinho de compras.
​Detalhes: No carrinho, você preenche seu endereço e observações (como pontos da carne ou retirada).
​Envio: Clique em enviar e sua lista pronta será enviada diretamente para o nosso WhatsApp!
​Depois disso, é só aguardar nossa confirmação. Bom apetite! ✨"
`
function statusLoja() {
  // Tab to edit

const statusDaLoja = document.getElementById('statusOnline')


const agora = new Date();
const horaAtual = agora.getHours();

// A variável será true se a hora for maior ou igual a 9 E menor que 18
const horarioComercial = horaAtual >= 9 && horaAtual < 21;

let minhaMensagem

if(horarioComercial){
  statusDaLoja.innerHTML=`
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>                       <span class="text-green-500 text-[10px] font-bold uppercase">Aberto agora</span>
  `
  
}else{
statusDaLoja.innerHTML=`
                 <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                  <span class="text-red-500 text-[10px] font-bold uppercase">Fechado agora</span>
 `
}

}
statusLoja()
function openBox(target, event) {
  // 1. Impede que o clique no botão chegue ao 'window' imediatamente
  event.stopPropagation();

  const alvo = document.getElementById(target);
  
  // 2. Mostra a box
  alvo.classList.toggle('hidden');

  // 3. Cria a função para fechar ao clicar fora
  const fecharAoClicarFora = (e) => {
    // Verifica se o clique NÃO foi dentro da box
    if (!alvo.contains(e.target)) {
      alvo.classList.toggle('hidden');
      // 4. Remove o evento do window para não poluir a memória
      window.removeEventListener('click', fecharAoClicarFora);
    }
  };

  // 5. Adiciona o evento ao window
  window.addEventListener('click', fecharAoClicarFora);
}
async function listarCat(idAtivo, classe) {
  let myDb = await getDados();

  const dbClasse = myDb.filter(db => {
    const prodClasse = db.classe.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[ ]/g, "");
    const slcClasse = classe === prodClasse || !classe;
    return slcClasse;
  });

  const dbCategorias = [...new Set(dbClasse.map(bl => bl.categoria))];
  dbCategorias.sort((a, b) => a.localeCompare(b));

  const navCat = document.getElementById('navCat');
  navCat.innerHTML = '';

  // --- Botão "Todos" ---
  const divTodos = document.createElement('button');
  divTodos.className = 'shadow-sm shadow-gray-500/30 bg-yellow-400 font-bold text-sm px-3 py-1 rounded-lg whitespace-nowrap text-gray-700';
  divTodos.innerText = 'Todos';
  divTodos.id = 'todos';

  divTodos.addEventListener('click', () => {
    listarCat('', classe);
    navegacao('cardapio');
    listaProdutos('', '', classe);
  });

  if (!idAtivo) {
    divTodos.classList.replace('bg-yellow-400', 'bg-white');
  }

  navCat.appendChild(divTodos);

  // --- Loop com for...of ---
  // Usamos .entries() para ter acesso ao índice, similar ao forEach
  for (const [index, item] of dbCategorias.entries()) {
    const idBotao = 'btCat' + index;

    const btn = document.createElement('button');
    btn.id = idBotao;
    btn.innerText = item;
    btn.className = 'shadow-sm shadow-gray-500/30 bg-yellow-400 font-bold text-sm px-3 py-1 rounded-lg whitespace-nowrap text-gray-700';

    // Aplica destaque se estiver ativo
    if (idBotao === idAtivo) {
      btn.classList.replace('bg-yellow-400', 'bg-white');
    }

    btn.addEventListener('click', () => {
      listarCat(idBotao, classe);
      navegacao('cardapio');
      listaProdutos(item, '', classe);
    });

    navCat.appendChild(btn);
  }

  navegacao('cardapio');
}
async function listaProdutos(idCat, termo, lista) {
  const myDb = await getDados();

  const cardapioGrid = document.getElementById('cardapio-grid');
  if (!cardapioGrid) return;

  const listaParaFiltrar = myDb.filter(fl => {
    const classeReplace = fl.classe.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[ ]/g, "");
    const listaTratada = classeReplace === lista || !lista;
    return listaTratada;
  });

  const termoBusca = termo.toLowerCase().trim();

  const produtosFiltrados = listaParaFiltrar.filter(prod => {
    const correspondeCat = (idCat === '' || prod.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() === idCat.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
    const correspondeNome = prod.nome.toLowerCase().includes(termoBusca);
    return correspondeCat && correspondeNome;
  });

  if (produtosFiltrados.length === 0) {
    cardapioGrid.innerHTML = `
      <div class="col-span-2 flex flex-col items-center justify-center py-10 text-gray-400">
        <i data-lucide="frown" class="w-10 h-10 mb-2"></i>
        <span class="font-bold">Nenhum item encontrado</span>
      </div>`;
    lucide.createIcons();
    return;
  }

  cardapioGrid.innerHTML = '';
  produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));

  // --- Primeiro Loop: Produtos ---
  for (const prod of produtosFiltrados) {
  
  const nomeEscapado = prod.nome.replace(/'/g, "");
const marcaEscapada = prod.marca.replace(/'/g, "\\'");
    const prodCard = document.createElement('div');
    prodCard.className = 'w-full grid grid-cols-1 px-2';
    prodCard.innerHTML = `
      <div class="bg-gray-50 py-4 mt-2 px-2 border-b border-gray-100 grid grid-cols-1 transition-colors rounded-lg relative">
        <div class="flex-grow pr-4 ">
          <h3 class=" font-black text-gray-700 uppercase tracking-tight flex">
            <span class=" text-md text-blue-500 ml-2">${nomeEscapado.trim()}</span>
            <i class="w-4 h-4 text-green-500 translate-y-[5px]" data-lucide="corner-right-down"></i>
          </h3>
        </div>
        <div id="listProdEmb${prod.id}"></div>
      </div>`;

    cardapioGrid.appendChild(prodCard);

    const listProdEmb = document.getElementById(`listProdEmb${prod.id}`);
    listProdEmb.innerHTML = '';

    // --- Segundo Loop: Embalagens (Nested for...of) ---
    for (const emb of prod.embalagens) {
   
  
    const precoFormatado = parseFloat(emb.preco.replace(",","."))
  
   const descontoFormatado = parseFloat(emb.desconto)
  
   let precoFinal = parseFloat(precoFormatado - descontoFormatado)
   
   precoFinalFormatado = precoFinal.toFixed(2).replace(".",",")
   
  
  
      const classeDesconto = descontoFormatado > 0.00 ? "" : "hidden";
      const precoDestaque = descontoFormatado > 0.00 ? "text-red-500 text-xl" : "";
      
      
 
      
      const prodEmb = document.createElement('div');
      prodEmb.innerHTML = `
        <div class="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm relative overflow-hidden flex flex-row items-center hover:bg-gray-50 transition-colors mb-2">
            <span class="${classeDesconto} bg-red-600 absolute top-0 left-0 px-2 py-0.5 rounded-br-lg font-black text-[9px] text-white uppercase">
                OFERTA
            </span>
            <div class="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-lg overflow-hidden mr-3"></div>
            <div class="flex-grow flex items-center justify-between min-w-0">
                <div class="flex flex-col min-w-0 -space-y-0.5"> 
                    <h4 class="text-[10px] font-bold text-gray-500 truncate leading-tight uppercase tracking-tighter">
                        ${nomeEscapado}
                    </h4>
                    <button onclick="openModal('${emb.cod}','${nomeEscapado}','${emb.tipo}','${precoFinal.toFixed(2)}')" class="text-left focus:outline-none">
                        <p class="text-[16px] font-black text-gray-900 leading-tight uppercase">
                            ${String(emb.tipo)}
                        </p>
                    </button>
                    <div class="flex flex-col pt-1">
                        <span id="tr-${emb.cod}" class="${classeDesconto} text-gray-400 text-[10px] line-through font-bold leading-none">
                            De: R$ ${precoFormatado}
                        </span>
                        <span class="text-[18px] font-black ${precoDestaque} text-red-600 leading-none">
                            <span class="text-xs font-bold">R$</span> ${precoFinalFormatado}
                        </span>
                    </div>
                </div>
                <button id="bt+${emb.cod}" 
                        class="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-lg p-2.5 shadow-sm active:scale-95 transition-all flex-shrink-0 ml-2 relative" 
                        onclick="openModal('${emb.cod}','${nomeEscapado}','${emb.tipo}','${precoFinal.toFixed(2)}')"">

                         <span  id="qtdItemBtn-${emb.cod}" class=" hidden absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>

                    <i class="w-5 h-5" data-lucide="shopping-basket"></i>
                </button>
            </div>
        </div>`;
      
      listProdEmb.appendChild(prodEmb);
      
const quantosNoCarrinho = meuCarrinho.find(ic =>ic.cod === emb.cod) || {qtd:0};
    let quantos = quantosNoCarrinho.qtd || 0
    const dotQtd = document.getElementById(`qtdItemBtn-${emb.cod}`)
    
  if(quantos >= 1){
    dotQtd.classList.remove('hidden')
     dotQtd.innerHTML = quantosNoCarrinho.qtd
  }else if(quantos === 0){

    dotQtd.classList.add('hidden')
  }
    }

    // 6. Persistência Visual
    const qtdNoCarrinho = meuCarrinho.filter(item => item.id === prod.id).length;
    if (qtdNoCarrinho >= 1) {
      // Pequeno ajuste preventivo aqui: verifique se os elementos existem antes de alterar
      const btnProd = document.getElementById(`btn-${prod.id}`);
      const seletorProd = document.getElementById(`seletor-${prod.id}`);
      
      if (btnProd) btnProd.classList.add('hidden');
      if (seletorProd) {
        seletorProd.classList.remove('hidden');
        const numProd = document.getElementById(`num-${prod.id}`);
        if (numProd) numProd.innerText = qtdNoCarrinho;
      }
    }
  }

  lucide.createIcons();
}
async function listaProm() {
const db = await getDados();
         
   const boxPromocoes= document.getElementById('boxPromocoes')
    
    boxPromocoes.innerHTML=''
    
    const listaFiltrada = db.filter(produto => {
  return produto.embalagens.some(emb => {
    return emb.desconto > 0;
  });
});

 if(listaFiltrada.length === 0){
   const semPromocao = document.createElement('div')
  semPromocao.className = 'w-full flex justify-center relative '
        semPromocao.innerHTML=`
<div id="promocoesVazias" class="w-full max-w-2xl mx-auto my-12 p-12 bg-white rounded-[3rem] border-2 border-dashed border-yellow-100 flex flex-col items-center text-center">
    
    <div class="bg-yellow-50 p-8 rounded-full mb-6 animate-bounce-slow">
        <i data-lucide="tag" class="w-20 h-20 text-yellow-500 opacity-40"></i>
    </div>

    <h2 class="text-3xl font-black text-gray-800 mb-3">Nenhuma promoção agora</h2>
    <p class="text-gray-500 max-w-sm mb-10 text-lg">
        Estamos preparando novas ofertas irresistíveis. Que tal conferir o cardápio principal enquanto espera?
    </p>

    <button onclick="navegacao('home')" 
            class="group flex items-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black px-10 py-5 rounded-2xl shadow-xl shadow-yellow-200 active:scale-95 transition-all uppercase tracking-widest text-sm">
        Ver Cardápio Completo
        <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
    </button>
</div>
        `
        
        boxPromocoes.appendChild(semPromocao)  
        
        if (typeof lucide !== 'undefined') lucide.createIcons();

  }else if(listaFiltrada.length > 0){

      for(const pr of listaFiltrada){
     for(const de of pr.embalagens){
    
    const precoFormatado = parseFloat(de.preco.replace(",","."))
  
   const descontoLimpo = parseFloat(de.desconto)
  
   let precoFinal = parseFloat(precoFormatado - descontoLimpo)
   
   precoFinalFormatado = precoFinal.toFixed(2).replace(".",",")
  
    const nomeEscapado = pr.nome.replace(/'/g, "");

  const promocao = document.createElement('div')
  promocao.className = 'w-full flex justify-center relative '  
  promocao.innerHTML=`
  

        <span class="bg-red-500 absolute top-0 right-0 px-2 py-0.5 rounded-xl font-black text-[14px] text-white tracking-tighter uppercase shadow-sm ">
        OFERTA IMPERDÍVEL!
    </span>
    
  <div class="w-full bg-white p-8 rounded-3xl shadow-sm border hover:shadow-lg transition-shadow ">
  

  
                 <button id="bt+${de.cod}" 
                
                onclick="openModal('${de.cod}','${nomeEscapado}','${de.tipo}','${precoFinal.toFixed(2)}')">
                <h3 class="text-2xl font-bold text-red-500 mb-2">${nomeEscapado} </h3>
                 </button>

                <p class="text-gray-700 text-lg italic  mb-4">${de.tipo}</p>
                  
                <div class="grid grid-cols-2">
                <div class="grid grid-cols-1">
                            <span id="tr-${de.cod}" class="text-gray-400 text-[16px] line-through decoration-red-300">
                De: R$ ${precoFormatado.toFixed(2).replace(".",",")}
            </span>
                <span class="text-4xl font-black text-red-500">${precoFinalFormatado}</span>
                </div>

            <button id="bt+${de.cod}" 
                class="relative bg-yellow-400 text-gray-700 rounded-xl p-2.5  flex items-center gap-2 font-black justify-center" 
                onclick="openModal('${de.cod}','${nomeEscapado}','${de.tipo}','${precoFinal.toFixed(2)}')">
             ADICIONAR

              <span  id="qtdItemBtn2-${de.cod}" class=" hidden absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full z-10">0</span>
        </button>

            </div>
            </div>
  
  `
   boxPromocoes.appendChild(promocao)  

        
const quantosNoCarrinho = meuCarrinho.find(ic =>ic.cod === de.cod) || {qtd:0};
    let quantos = quantosNoCarrinho.qtd || 0
    const dotQtd = document.getElementById(`qtdItemBtn2-${de.cod}`)
    
  if(quantos >= 1){
    dotQtd.classList.remove('hidden')
     dotQtd.innerHTML = quantosNoCarrinho.qtd
  }else if(quantos === 0){

    dotQtd.classList.add('hidden')
  }

      }
 
    }
  }
  if (typeof lucide !== 'undefined') lucide.createIcons();
      }
      
      
async function validarCaminhoImagem(nomeArquivo) {
  const caminho = `./img/${nomeArquivo}`;
  try {
    const response = await fetch(caminho, { method: 'HEAD' });
    // Se retornar 200-299, a imagem existe
    return response.ok ? caminho : './img/noimage.gif';
  } catch {
    return './img/noimage.gif'; // Se der erro de rede, usa a padrão
  }
}

async function listaTop20() {
 
const dbGeral = await getDados();

const divtop10 = document.getElementById('boxTop10');

// Filtramos apenas a categoria cerveja antes de processar as variações
const apenasGeral = dbGeral.filter(x => x);


let variacoesGeral = [];
// 2. Criar lista de variações (Flattening)
apenasGeral.forEach(produto => {
  produto.embalagens.forEach(emb => {
    variacoesGeral.push({
      ...produto,
      cod:emb.cod,
      tipo: emb.tipo,
      preco: emb.preco,
      desconto:emb.desconto,
      vendas: Number(emb.vendas) || 0
    });
  });
});

// 3. Ordenar e Selecionar Top 5
variacoesGeral.sort((a, b) => b.vendas - a.vendas);
const top10 = variacoesGeral.slice(0, 20);

// 4. Limpar e Renderizar
divtop10.innerHTML = '';

 // Usamos for...of para poder usar o 'await' dentro do loop corretamente
  for (const item of top10) {

    const nomeImagem = `${item.marca.replace(/[^a-zA-Z]/g,"").toLowerCase()}.svg`;
    
    // ✅ Agora esperamos a verificação de cada imagem individualmente
    const srcImagem = await validarCaminhoImagem(nomeImagem);

  const card = document.createElement('div'); // Nome da variável simplificado
  card.className = "w-full flex-none px-2 pb-4";
  
  // Formatando o preço para o padrão brasileiro
  const precoFormatado = parseFloat(item.preco.replace(",","."))
  
  const descontoFormatado = parseFloat(item.desconto)
  
   let precoFinal = parseFloat(precoFormatado - descontoFormatado);

  precoFinalFormatado = precoFinal.toFixed(2).replace(".",",")

  
const classeDesconto = descontoFormatado > 0.00 ? "" : "hidden";

const precoDestaque = descontoFormatado > 0.00 ? "text-red-500 text-md" : "";


const imagem = `${item.marca.replace(/[^a-zA-Z]/g,"").toLowerCase()}.svg`

const nomeEscapado = item.nome.replace(/'/g, "");
const marcaEscapada = item.marca.replace(/'/g, "\\'");
 
   
  card.innerHTML = `
<div class="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm relative overflow-hidden flex flex-row items-center hover:bg-gray-50 transition-colors mb-2">
    
    <span class="${classeDesconto} bg-red-600 absolute top-0 left-0 px-2 py-0.5 rounded-br-lg font-black text-[9px] text-white uppercase tracking-tighter">
        OFERTA
    </span>
      
    <div class="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-xl overflow-hidden mr-3">
        <img src="${srcImagem}" alt="${nomeEscapado}" class="w-full h-full object-contain mix-blend-multiply"/>
    </div>
          
    <div class="flex-grow flex items-center justify-between min-w-0">
        
        <div class="flex flex-col min-w-0 mr-2">
            <button class="text-left focus:outline-none" onclick="openModal('${item.cod}','${nomeEscapado}','${item.tipo}','${precoFinal.toFixed(2)}')">
                <h4 class="text-[15px] font-bold text-gray-800 truncate leading-tight mb-0.5">
                    ${nomeEscapado}
                </h4>
            </button>
            
            <p class="text-[11px] font-semibold text-gray-400 italic mb-1 uppercase tracking-tight">
                ${item.tipo}
            </p>

            <div class="flex flex-col leading-none">
                <span id="tr-${item.cod}" class="${classeDesconto} text-gray-400 text-[10px] line-through mb-0.5">
                    De: R$ ${precoFormatado.toFixed(2).replace(".",",")}
                </span>
                <span class="text-[16px] font-black ${precoDestaque} text-red-600">
                    <span class="text-xs font-bold">R$</span> ${precoFinalFormatado}
                </span>
            </div>
        </div>

        <button id="bt+${item.cod}" 
                class="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 rounded-xl p-3 shadow-sm active:scale-95 transition-all flex-shrink-0 relative" 
                onclick="openModal('${item.cod}','${nomeEscapado}','${item.tipo}','${precoFinal.toFixed(2)}')">

                      <span  id="qtdItemBtn1-${item.cod}" class=" hidden absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>

            <i class="w-5 h-5" data-lucide="shopping-basket"></i>
        </button>
    </div>
</div>

  `;
  divtop10.appendChild(card);
  
const quantosNoCarrinho = meuCarrinho.find(ic =>ic.cod === item.cod) || {qtd:0};
    let quantos = quantosNoCarrinho.qtd || 0
    
    const dotQtd = document.getElementById(`qtdItemBtn1-${item.cod}`)
    
  if(quantos >= 1){
    dotQtd.classList.remove('hidden')
     dotQtd.innerHTML = quantosNoCarrinho.qtd
  }else if(quantos === 0){

    dotQtd.classList.add('hidden')
  }
};
lucide.createIcons();
    }
function toggleModalVazio() {
    const modal = document.getElementById('modalVazio');
    modal.classList.toggle('hidden');
}
let currentQty =1
let unitPrice 
function openModal(cod,nome, embalagem, preco,curQtd){
  
 let currentQtd = meuCarrinho.find(mi=>mi.cod===cod)
  let btnDel
 if(!currentQtd){ 
   currentQty = 1
   btnDel = 'hidden'
 }else {
 currentQty = currentQtd.qtd 
 
 btnDel=''
 }
 
  const precoFloat = parseFloat(preco)
  
  precoFinal = precoFloat.toFixed(2).replace(".",",")
    
  
  
  unitPrice = preco;
  

  
document.getElementById('modalOverlay').innerHTML=''
    // Atualiza os dados no modal
  
  document.getElementById('modalOverlay').innerHTML=`

<div class="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl transform translate-y-full transition-transform duration-300" id="modalBox">
    
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 id="modalProdNome" class="text-2xl font-black text-gray-900 leading-tight">${nome}</h2>
        <p id="modalProdDetalhe" class="text-gray-700 font-medium">${embalagem}</p>
      </div>
      
      <!-- ÍCONE: X (FECHAR) -->
      <button onclick="closeModal()" class="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
        <i data-lucide="x" class="w-6 h-6 text-gray-600"></i>
      </button>
    </div>
    
    <hr class="border-gray-100 mb-6">
    
    <div class="flex items-center justify-between mb-8">
      <div>
        <span class="text-xs font-bold text-orange-500 uppercase tracking-widest">Preço Unitário</span>
        <div class="text-3xl font-black text-gray-900" id="modalProdPreco">${precoFinal}</div>
      </div>
      
      <button class="border border-red-500 rounded-md p-2 ${btnDel}" id="deleteItem" onclick="removerItem('${cod}')">
      <i data-lucide="trash" class="w-6 h-6  text-red-500 "></i>
      </button>
      
      
      <div class="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
      
  
        <!-- ÍCONE: MINUS (MENOS) -->
        <button onclick="updateQty(-1)" class="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm active:scale-90 transition-transform">
          <i data-lucide="minus" class="w-5 h-5 text-orange-600 stroke-[3px]"></i>
        </button>
        
        <span id="qtyDisplay" class="mx-4 text-xl font-bold text-gray-700 min-w-[24px] text-center">${curQtd}</span>
        
        <!-- ÍCONE: PLUS (MAIS) -->
        <button onclick="updateQty(1)" class="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm active:scale-90 transition-transform">
          <i data-lucide="plus" class="w-5 h-5 text-orange-600 stroke-[3px]"></i>
        </button>
      </div>
    </div>
    
    <button id="modalProdBtnAdd" onclick="confirmAdd('${cod}','${nome}', '${embalagem}','${preco}')" class="w-full bg-yellow-400 hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all flex justify-between px-6 items-center">
      <span>ADICIONAR AO PEDIDO</span>
      <div class="flex items-center gap-2">
        <span id="totalPrice" class="bg-orange-600 px-3 py-1 rounded-lg text-sm">R$ 9,90</span>
        <!-- ÍCONE: SHOPPING-CART (OPCIONAL) -->
    </div>
    </button>
</div>
`
  // Inicializa os ícones após o carregamento (necessário para o método CDN)
  lucide.createIcons();
  
  // fim do innerHTML
    

  
  updateDisplay();

  // Mostra o modal com animação
  const overlay = document.getElementById('modalOverlay');
  const box = document.getElementById('modalBox');
  
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.add('opacity-100');
    box.classList.remove('translate-y-full');
  }, 5);
  
}
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  const box = document.getElementById('modalBox');
  
  box.classList.add('translate-y-full');
  overlay.classList.remove('opacity-100');
  
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300);
}
function updateQty(val) {
  if (currentQty + val >= 1) {
    currentQty += val;
    updateDisplay();
  } 
    
}
function updateDisplay() {
 document.getElementById('qtyDisplay').innerText = currentQty;
  const total = (currentQty * unitPrice).toFixed(2).replace('.', ',');
  document.getElementById('totalPrice').innerText = `R$ ${total}`;
}
function removerItem(cod) {
  
document.getElementById('modalRemover').classList.remove('hidden')
document.getElementById('remInputCod').value= cod

itemSel = meuCarrinho.filter(item => item.cod === cod);
  
const msgRemov = document.getElementById('msg-produto-removido')

  msgRemov.innerText=`Remover ${itemSel[0].nome.toUpperCase()} do seu carrinho.`
}
function confirmaRemover(cod) {
const codInput = document.getElementById('remInputCod').value
  meuCarrinho = meuCarrinho.filter(item => item.cod !== codInput);
  localStorage.setItem('carrinho', JSON.stringify(meuCarrinho));
  atualizaContador()
  navegacao(paginaAtual)
  closeModal()

}
function fecharModalRemover() {
  
document.getElementById('modalRemover').classList.add('hidden')
  
  
}
function confirmAdd(cod,nome,embalagem,preco) {

  const produto = {
        cod: cod,
        nome:nome,
        embalagem:embalagem,
        preco: preco.replace(/[^0-9,.]/g,""),
        qtd: Number(currentQty)
    };
    
    
  const repetido = meuCarrinho.find(x=>x.cod === cod)
  
  if(repetido){
    
    repetido.qtd = Number(currentQty)
    
  }else{
   
  meuCarrinho.push(produto)
  }
  localStorage.setItem('carrinho',JSON.stringify(meuCarrinho))
  modalAdicionado(cod,nome,embalagem,preco)

  atualizaContador()
  closeModal();
}
function atualizarCarrinho() {
   
    
  const container = document.getElementById("itensCarrinho");
  const totalElemento = document.getElementById("valorTotal");
  
  // Limpa a lista antes de renderizar
  container.innerHTML = "";
let comAcomp ='hidden'
  // 1. Renderiza os Itens
  meuCarrinho.forEach(item => {
      
      if(item.acompanhamentos){comAcomp = ''}else{comAcomp='hidden'}
  
  
    // Formatando o preço para o padrão brasileiro


  
   let precoFinal = parseFloat(item.preco).toFixed(2)
   
  let precoXquantidade = (item.qtd* item.preco).toFixed(2)
   
  precoXquantidade = precoXquantidade.replace(".",",")
   
  precoFinal = precoFinal.replace(".",",")
       
    container.innerHTML += `

    
              
              <button onclick="openModal('${item.cod}','${item.nome}','${item.embalagem}','${item.preco}')" class="flex justify-between items-center border-2 border-yellow-400 border-md w-full p-1 mb-1 border-l-[5px] rounded-md">
                
                <div class=" justify-left flex text-left flex-col">
                
                <div class="grid grid-cols-1">
              <span>
              ${item.qtd} X ${item.nome}
              </span>
              <small class="text-[10px] text-gray-700">
              ( ${item.embalagem} - ${precoFinal} Un. )</small>
                </div>
  
        <div class="grid grid-cols-1">
          <span class="${comAcomp} w-ful text-orange-400 text-[12px] border-b">
         Ac: ${item.acompanhamentos}
          </span>
          <span class="${comAcomp} w-ful text-blue-400 text-[12px]">
         Obs: ${item.observacao}
          </span>
            </div>
                </div>
              
                <span class="font-bold">R$ ${precoXquantidade}</span>
                
                </button>
                
            
      
    `;
  });

  // 2. O "Reduce" em ação para o total
  const total = meuCarrinho.reduce((acc, item) => acc + parseFloat((item.preco*item.qtd)) ,0);
  
  
  
  totalElemento.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  lucide.createIcons();
}
async function enviarWhatsApp() {

const userdados = await userDados()

// Busca o input que está selecionado (checked)
  const meioDePagamento = document.querySelector('input[name="pay_method"]:checked');

    const modal = document.getElementById('modalProcessando');
    modal.classList.remove('hidden');
    // Garante que os ícones do Lucide carreguem dentro do modal
    lucide.createIcons();
    
    
setTimeout(() => {

  
  const obsCarrinho= document.getElementById('obsCarrinho').value
  

  const endereco = `${userdados.rua},${userdados.casa} - ${userdados.bairro}`
  
  const numeroTelefone = "5522997263224"; // Substitua pelo seu número (com DDD)
  // Centralizando a formatação de moeda para evitar repetição
const formatarMoeda = (valor) => 
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Simulando um número de pedido aleatório ou sequencial

const numeroPedido = Date.now().toString().slice(-6); // Pega os últimos 6 dígitos do timestamp

let mensagem = `☝️Olá, Gostaria de Fazer um pedido.\n\n`;

mensagem += `* Meu nome é : ${userdados.nome}\n\n`;

 mensagem += `📋 *Pedido n° ${numeroPedido}*\n\n`;

mensagem += `*Itens:*\n\n`;

meuCarrinho.forEach(item => {
  
  // O emoji ➡️ e o formato "1x NOME" conforme a imagem
  mensagem += `➡️ ${item.qtd}x ${item.nome.toUpperCase()} - ${formatarMoeda(item.preco)}R$\n`;

  if(item.acompanhamentos){
   mensagem+= `com (${item.acompanhamentos})\n`
  }else{}
  if(item.observacao){
 mensagem += `(${item.observacao})\n`;
  }else{}
 mensagem += ` \n`
 
});
// Caso tenha observações ou opcionais (como os molhos da imagem)
mensagem += `\n❕OBS: ${obsCarrinho || ''}\n\n`;
  
// Detalhes de Delivery
  mensagem += `🏠 envie para: ${endereco || "Endereço não informado"}\n\n`;

//const taxaEntrega = 3.00  

// Cálculo do Total
const totalProdutos = meuCarrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);



const totalGeral = totalProdutos;

//mensagem += `Taxa de entrega: 3,00R$\n\n`;

mensagem += `*Total: ${formatarMoeda(totalGeral)}*\n`;

mensagem += `*forma de Pagamento: ${meioDePagamento.value}*\n\n`;

if(meioDePagamento.value ==='DINHEIRO'){

const inputTroco= parseFloat(document.getElementById('inputTroco').value).toFixed(2)

  mensagem += `*Troco para :${formatarMoeda(inputTroco)}*\n\n`;
}


/* Envio */
const numeroLimpo = numeroTelefone.replace(/\D/g, '');
const url = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    
    
    const hoje = new Date();
// Data e hora: DD/MM/AAAA, HH:MM:SS
let dataHora =hoje.toLocaleString('pt-BR')
    
   let meuPedido= [{numero:numeroPedido, pedido:[],data:dataHora}]
    
    meuPedido[0].pedido.push(...meuCarrinho)
    
    const historico = JSON.parse(localStorage.getItem('meuHistorico')) || []
    
    let meuHistorico = historico.push(...meuPedido)
   // meuHistorico.push(...meuPedido)
 //   let meusPedidos = []
  //  meusPedidos.push(pedido)
  
  localStorage.setItem('meuHistorico', JSON.stringify(historico));
  
    meuCarrinho = []
    localStorage.setItem('carrinho', JSON.stringify(''));

 //   modal.classList.add('hidden');
    
    atualizaContador()

    navegacao('home')
  //  window.open(url, '_blank');

setTimeout(()=>{
   //  window.location.reload()
    modal.classList.add('hidden');

   //  enviarWhatsApp()
},3000)    
  
},1000)
}
function verCarrinho(){
    
    if(meuCarrinho.length === 0){
        
        toggleModalVazio()
        
    }else{
    
    const navBarCat = document.getElementById('navCat')
  
  navegacao('pageCarrinho')
  
    const span = document.getElementsByClassName("close")[0];

    span.addEventListener('click',() =>{
    
      navegacao('home')
      navBarCat.classList.remove('hidden')
     
    } )
    
    }


}
async function verPerfil() {
 const dados = await userDados()
  
  navegacao('perfilUser')
  navegacaoUser('historico')

 const primeiraLetra = dados.nome[0]
 const meta = 500
 document.getElementById('pflLetra').innerText=primeiraLetra
  document.getElementById('pflNome').innerText=dados.nome
  document.getElementById('pflTel').innerText=dados.tel
  document.getElementById('pflPontos').innerText=dados.pontos%meta
  document.getElementById('pflPontosRestantes').innerHTML= meta - dados.pontos%meta
  
  const progressPontos = dados.pontos%meta / meta * 100
  
  const cupons = Math.floor(dados.pontos%meta)
  
  document.getElementById('pflBarraPontos').style.width= progressPontos+'%'
  
///  verifica se ja tem endereço alternativo
const enderecoTemp = dados.casa
if(enderecoTemp){
  
  document.getElementById('spanEndereco').innerText=`${dados.rua}, ${dados.casa} - ${dados.bairro}`
  

}else{
document.getElementById('spanEndereco').innerText='Cadastre um endereço'
}
lucide.createIcons();  
}
function navegacaoUser(open){
const abas = ['historico','ajuda']  

  abas.forEach(s =>{
    
    document.getElementById(s).classList.add('hidden')
    
  })
  document.getElementById(open).classList.remove('hidden')

  switch(open){
    case 'historico':
      carregarHistorico()
    break; 
    case 'ajuda':
    carregarAjuda()
    break;
    case 'configuracoes':
      // carregarConfig()
    break;

}
}
function carregarAjuda() {

document.getElementById('containerAjuda').innerHTML = `

    
    <div class="mb-10 text-center md:text-left">
        <h2 class="text-2xl font-black text-gray-800">Canais de Atendimento</h2>
        <p class="text-gray-500">Escolha como prefere falar conosco.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        <div class="bg-white p-8 rounded-[2.5rem] border border-green-100 shadow-sm flex flex-col items-center text-center">
            <div class="bg-green-50 p-5 rounded-3xl mb-4">
                <i data-lucide="message-circle-more" class="w-10 h-10 text-green-500"></i>
            </div>
            <h3 class="font-black text-gray-800 text-xl mb-1">WhatsApp</h3>
            <p class="text-green-600 font-bold text-sm mb-3">Suporte em Tempo Real</p>
            <p class="text-gray-500 text-sm leading-relaxed">
                (22) 99999-9999<br>
                Segunda a Domingo, das 11h às 23h
            </p>
        </div>

       

    <div class="bg-gray-50 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 justify-around items-center">
        
        <div class="flex flex-col items-center gap-2">
            <i data-lucide="mail" class="w-5 h-5 text-yellow-500"></i>
            <span class="text-xs font-black text-gray-400 uppercase tracking-tighter">E-mail Corporativo</span>
            <span class="font-bold text-gray-700">contato@suamarca.com.br</span>
        </div>

        <div class="hidden md:block w-px h-12 bg-gray-200"></div>

        <div class="flex flex-col items-center gap-2">
            <i data-lucide="phone" class="w-5 h-5 text-yellow-500"></i>
            <span class="text-xs font-black text-gray-400 uppercase tracking-tighter">Central de Voz</span>
            <span class="font-bold text-gray-700">0800 123 4567</span>
        </div>
    </div>
`
lucide.createIcons();
}
function carregarHistorico() {

    // Simulando a busca no localStorage (ajuste o nome da chave se necessário)
    const historicoCompleto = JSON.parse(localStorage.getItem('meuHistorico')) || [];
    const container = document.getElementById('containerHistorico');

    if (historicoCompleto.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 py-10">Nenhum pedido encontrado.</p>';
        return;
    }

    container.innerHTML = historicoCompleto.map(item => {
        // Calcula o total do pedido (soma de preço * qtd de todos os itens no array 'pedido')
        const totalPedido = item.pedido.reduce((acc, p) => acc + (parseFloat(p.preco) * p.qtd), 0);

        return `
        <div class="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-gray-50 px-6 py-3 flex justify-between items-center border-b border-gray-100">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Pedido #${item.numero}</span>
                <span class="text-xs text-gray-500">${item.data}</span>
            </div>

            <div class="p-6">
                ${item.pedido.map(p => `
                    <div class="flex justify-between items-center mb-2">
                        <div>
                            <h3 class="font-bold text-gray-800 text-sm">${p.nome}</h3>
                            <p class="text-xs text-gray-400">${p.embalagem} | Qtd: ${p.qtd}</p>
                        </div>
                        <span class="font-semibold text-gray-700">R$ ${parseFloat(p.preco).toFixed(2)}</span>
                    </div>
                `).join('')}
                
                <hr class="my-4 border-dashed border-gray-200">

                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-[10px] text-gray-400 uppercase font-black">Total Pago</p>
                        <p class="text-xl font-black text-yellow-600">R$ ${totalPedido.toFixed(2)}</p>
                    </div>

                    <button onclick="abrirModalConfirmacao('${item.numero}')" 
        class="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-xl text-sm      font-bold transition-colors flex items-center gap-2">
                  <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                 Repetir Pedido
                    </button>
                 
                </div>
            </div>
        </div>
        `;
    }).join('');

    // Atualiza os ícones do Lucide
    lucide.createIcons();
}
function repetirPedido(numeroPedido) {
    
    // 1. Pegar o histórico e o carrinho atual (Síncrono, sem await)
    const historico = JSON.parse(localStorage.getItem('meuHistorico')) || [];
    let meuCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // 2. Encontrar o pedido específico no histórico
    // Importante: garantir que a comparação seja do mesmo tipo (String ou Number)
    const pedidoEncontrado = historico.find(p => String(p.numero) === String(numeroPedido));

    if (pedidoEncontrado) {
        // 3. Percorrer os itens do pedido encontrado
        pedidoEncontrado.pedido.forEach(itemHistorico => {
            
            const jaNoCarrinho = meuCarrinho.find(x => x.cod === itemHistorico.cod);

            if (jaNoCarrinho) {
                // Soma a quantidade existente com a do histórico
                jaNoCarrinho.qtd += Number(itemHistorico.qtd);
            } else {
                // Cria o objeto para o carrinho
                const novoProduto = {
                    cod: itemHistorico.cod,
                    nome: itemHistorico.nome,
                    embalagem: itemHistorico.embalagem,
                    // Garante que o preço seja tratado como string para o replace
                    preco: String(itemHistorico.preco).replace(/[^0-9,.]/g, ""),
                    qtd: Number(itemHistorico.qtd)
                };
                meuCarrinho.push(novoProduto);
            }
        });

        // 4. Salvar no localStorage
        localStorage.setItem('carrinho', JSON.stringify(meuCarrinho));

        // 5. Atualizar Interface
        if (meuCarrinho.length >= 1) {
      
            if (typeof atualizaContador === "function") atualizaContador();
            if (typeof verCarrinho === "function") verCarrinho();
            
        }
    } else {
        console.error("Pedido não encontrado no histórico:", numeroPedido);
    }
}
function abrirModalConfirmacao(numeroPedido) {
    const modal = document.getElementById('modalConfirmarRepetir');
    const btnConfirmar = document.getElementById('btnConfirmarRepetir');
    
    // Mostra o modal
    modal.classList.remove('hidden');

    // Quando clicar no botão "Sim", executa a lógica e fecha o modal
    btnConfirmar.onclick = function() {
        repetirPedido(numeroPedido);
        fecharModalConfirmar();
    };
}
function fecharModalConfirmar() {
    document.getElementById('modalConfirmarRepetir').classList.add('hidden');
    voltarPage()
}


document.getElementById('form-cadastro').addEventListener('submit', function(e) {
  e.preventDefault();
  // Aqui você salvaria os dados no banco
  document.getElementById('modal-cadastro').style.display = 'none';
  alert('Bem-vindo(a)!');
});
function modalAdicionado(cod, nome, tipo, preco) {
    const modal = document.getElementById('modalAdicionado');
   
  const displayMsg = document.getElementById('msg-produto');

    // Insere o nome do produto no parágrafo
    displayMsg.innerHTML = `O item <span class="text-yellow-600 font-bold">"${nome}"</span> foi colocado no seu carrinho.`;

    // Exibe o modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}
function fecharModalAdicionado() {
    const modal = document.getElementById('modalAdicionado');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
// Fecha se clicar fora do card branco
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modalAdicionado');
    if (e.target === modal) fecharModalAdicionado();
});
async function cadastrarEnderecoAlternativo(e){
  
  const userdados = await userDados()
   
  e.preventDefault(); // Impede a página de recarregar
  
    userdados.rua = document.getElementById('inputRuaAlt').value

    userdados.casa =   document.getElementById('inputCasaAlt').value

    userdados.bairro =   document.getElementById('inputBairroAlt').value

    userdados.cep =   document.getElementById('inputCEPAlt').value

    userdados.complemento =  document.getElementById('inputComplementoAlt').value

localStorage.setItem('userDados',JSON.stringify(userdados))

  alert('Endereço Cadastrado')
  navegacao('home')
  slcEnderecoModal()    
}

let servicoInstalacao; // Variável para guardar o evento
const botaoInstalar = document.getElementById('btnInstalar');

// 1. Escuta o evento 'beforeinstallprompt'
window.addEventListener('beforeinstallprompt', (e) => {
  // Impede que o navegador mostre o banner automático muito rápido
  e.preventDefault();
  
  // Guarda o evento para ser usado depois
  servicoInstalacao = e;
  
  // Agora que sabemos que o app é instalável, mostramos o botão
  botaoInstalar.style.display = 'block';
});

// 2. Lógica do clique no botão
botaoInstalar.addEventListener('click', async () => {
  if (!servicoInstalacao) return;

  // Mostra a caixa de diálogo de instalação do navegador
  servicoInstalacao.prompt();

  // Verifica se o usuário aceitou ou recusou a instalação
  const { outcome } = await servicoInstalacao.userChoice;
  console.log(`Usuário escolheu: ${outcome}`);

  // Limpa a variável, pois o evento só pode ser usado uma vez
  servicoInstalacao = null;

  // Esconde o botão novamente
  botaoInstalar.style.display = 'none';
});

// 3. (Opcional) Esconde o botão se o app já for instalado
window.addEventListener('appinstalled', () => {
  console.log('App instalado com sucesso!');
  botaoInstalar.style.display = 'none';
});

lucide.createIcons();