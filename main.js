
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
  
  
function atualizaPontos(newPontos){
  const dataPontos = JSON.parse(localStorage.getItem('userDados'))

const dbAtualizado = {...dataPontos,pontos:dataPontos.pontos+newPontos}

//const dbAtualizado ={...dataBase, pontos:0}

localStorage.setItem('userDados',JSON.stringify(dbAtualizado))
}
atualizaPontos(1)
//////////////////////////////////
//////////////////////////////////
async function gerarHashSeguro(senhaPura) {
  const encoder = new TextEncoder();
  const senhaBuffer = encoder.encode(senhaPura);
  // 1. Gerar um Salt aleatório (essencial para que cada hash seja único)
  const salt = crypto.getRandomValues(new Uint8Array(16));
  // 2. Importar a senha como uma chave base
  const chaveBase = await crypto.subtle.importKey(
    "raw", senhaBuffer, "PBKDF2", false, ["deriveBits", "deriveKey"]
  );
  // 3. Derivar o Hash usando 100.000 iterações (Padrão de segurança)
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    chaveBase,
    256 // Tamanho do hash final em bits
  );

  // 4. Converter Salt e Hash para Hexadecimal para salvar no banco/storage
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

  return { saltHex, hashHex };
}


///dados da aplicação/////////////////////////////
const nomeApp = 'Vibe Delivery'
const tituloApp = 'Pediu, Brindou!'
const temaApp = [{}]
let meuCarrinho = []
//////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    
    const splash = document.getElementById('splash-pulse-container');
    splash.style.transition = 'opacity 0.5s ease';
    splash.style.opacity = '0';
    setTimeout(() => splash.remove(), 500);
  }, 3000); // 3 segundos é suficiente
});
//////////////////////////////////
//////////////////////////////////
function verificaLogin() {
  navegacao('splash')
  
  const userExist = JSON.parse(localStorage.getItem('userDados')) || []
  if(!userExist){
    
    
  }
  const ifLogged = document.querySelectorAll('.ifLogged')
  
  if(userExist){
    
    
    if(userExist.logged){

    ifLogged.forEach((item, index) => {
   item.classList.remove('hidden') 
});
    
  const headerViewEndereco= document.getElementById('btnViewEndereco')

  const nomeUser= userExist.nome.split(" ") || []
  headerViewEndereco.innerHTML=nomeUser[0]

   navegacao('home')
    }else{
      
    
      ifLogged.forEach((item, index) => {
    item.classList.add('hidden')
});
navegacao('userCadastro')
      return
    }
    
  }else {
    
    navegacao('userCadastro')
    
    ifLogged.forEach((item, index) => {
    item.classList.add('hidden')
});
    
  }
  
}
verificaLogin()
//////////////////////////////////
//////////////////////////////////
function verPerfil() {
  
  navegacao('perfilUser')
  
  
 const userDados = JSON.parse(localStorage.getItem('userDados'))||[]
 const primeiraLetra = userDados.nome[0]
 const meta = 500
 document.getElementById('pflLetra').innerText=primeiraLetra
  document.getElementById('pflNome').innerText=userDados.nome
  document.getElementById('pflTel').innerText=userDados.tel
  document.getElementById('pflPontos').innerText=userDados.pontos%meta
  document.getElementById('pflPontosRestantes').innerHTML= meta - userDados.pontos%meta
  
  const progressPontos = userDados.pontos%meta / meta * 100
  
  const cupons = Math.floor(userDados.pontos%meta)
  
  document.getElementById('pflBarraPontos').style.width= progressPontos+'%'
  
///  verifica se ja tem endereço alternativo
const enderecoTemp = userDados.casa
if(enderecoTemp){
  
  document.getElementById('spanEndereco').innerText=`${userDados.rua}, ${userDados.casa} - ${userDados.bairro}`
  

}else{
document.getElementById('spanEndereco').innerText='Cadastre um endereço'
}
lucide.createIcons();  
}
//////////////////////////////////
//////////////////////////////////

//////////////////////////////////
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
//////////////////////////////////
//////////////////////////////////
function navegacao(open) {
  
  window.scrollTo({
      top: 0,
      behavior: 'auto'
  })
      
  const allSections=['splash','home','userCadastro','perfilUser','userLogin','cardapio','modalCarrinho','pagePromocao','vitrineProdutos','editarUser','enderecoTemp']
  
  
  if(open === 'userCadastro'|| open === 'perfilUser' || open==='editarUser' || open==='enderecoTemp' || open === 'modalCarrinho'){
    
    const header = document.querySelector('header')
    header.classList.add('hidden')
   
  }else{
    
   
    document.querySelector('header').classList.remove('hidden')
  }
  if(open==='editarUser'){
    
    
    editaCadastroUser()
    
    
  }
  
  if(open ==='cardapio'){
    
    document.getElementById('navCat').classList.remove('hidden')
  }else{
    document.getElementById('navCat').classList.add('hidden')
  }
  if(open === 'home' || open === 'cardapio'){
    
        document.getElementById('headerTools').classList.remove('hidden')
  } else {
    document.getElementById('headerTools').classList.add('hidden')

  }
  const outras = ['userLogin','loginAdm','home','openSearch','openCategoria','openProduto']
  
  allSections.forEach(s =>{
    
    document.getElementById(s).classList.add('hidden')
    
  })
  document.getElementById(open).classList.remove('hidden')
}
//////////////////////////////////
//////////////////////////////////
function loading(txt) {
  
  document.getElementById('loading').classList.remove('hidden')
  document.getElementById('textLoading').innerText= txt
  setInterval(()=>{
    
    document.getElementById('loading').classList.add('hidden')
  },1000)
}
//////////////////////////////////
////////////////////.//////////////
function enviaCadastroUser(e,metodo) {

  e.preventDefault()
  
  
  const gerarID = () => {
    const letras = Math.random().toString(36).substring(2, 4).toUpperCase();
    const data = Date.now();
    return letras + data;
};

  
  
if(metodo ==='cadastrar'){
  
  const userNome = document.getElementById('inputNome').value

  const userTel = document.getElementById('inputTel').value

  const usuarioCompleto = {
    id: gerarID(),
    nome: userNome,
    tel: userTel,
    rua:'',
    casa:'',
    bairro:'',
    complemento:'',
    logged: true,
    pontos:0
  }
    
      // Salvando no localStorage de forma limpa
  localStorage.setItem('userDados', JSON.stringify(usuarioCompleto));
  
  window.location.reload()
    
}else if(metodo ==='editar'){
    
   const userdados = JSON.parse(localStorage.getItem('userDados'))
     
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
  
  
    
  
  
      // Salvando no localStorage de forma limpa
  localStorage.setItem('userDados', JSON.stringify(usuarioCompleto));
  navegacao('perfilUser')
  
  window.location.reload()
  
  }else{
  alert('palavra incorreta')
}
}

}
//////////////////////////////////
////////editar cadastro//////////
////////////////////.//////////////
function editaCadastroUser() {

  const userdados = JSON.parse(localStorage.getItem('userDados'))
   document.getElementById('editNome').value=userdados.nome
  document.getElementById('editTel').value=userdados.tel
  

}
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

function faixaAmarela(){
const marquee = document.getElementById('faixaTicker')
let marqueeText=`<div class="animate-ticker">

        🔥 CERVEJA GELADA EM MENOS DE 30 MINUTOS • COMPRE 5 LEVE 6 EM SKOL LATA • TAXA GRÁTIS ACIMA DE R$ 50,00 🔥
    </div> `;

 marquee.innerHTML = marqueeText;
}
faixaAmarela()
//////////////////////////////////
//////////////////////////////////
function bannerSlide() {
  const boxSlide = document.getElementById('slideBanner');
  if (!boxSlide) return;

  // 1. Defina aqui os caminhos de todas as suas imagens
  const caminhos = [
    '/img/img1.jpg',
    '/img/img2.jpg',
    '/img/img3.jpg',
    '/img/img4.jpg'
  ];
  const barnnerTxt = [
    'CHURRASCO NO<br><span class="text-yellow-400">FIM DE SEMANA?</span>'
    
    ,'COPÃO<br><span class="text-blue-400">CAPRICHADO!</span>'
    
    ,' TORCEDOR<br><span class="text-yellow-400">NOTA 10</span>'
    
    ,'CHURRASCO NO<br><span class="text-yellow-400">FIM DE SEMANA?</span>'
  ]
  const barnnerSubTxt = [
    'Carvão e gelo em dobro no combo!',
    'Dose dupla na Vodka',
    'Dia de jogo pede uma gelada',
    'Veja nossa area de promoções '
  ]
const goTo=[
  'churrasco',
  'copaPromocao',
  'CervejaTrincando',
  'superPromocoes'
]

  // 2. Criamos um array vazio para guardarmos os elementos HTML <img>
  const imagensHTML = [];

  caminhos.forEach((src, i) => {

    const img = document.createElement('img');
    img.src = src;
    // 'absolute' faz as imagens ficarem uma em cima da outra
    img.className = 'w-full h-full object-cover transition-opacity duration-1000 ease-in-out absolute top-0 left-0';
    
    // Deixa apenas a primeira imagem visível (index 0)
    if (i !== 0) {
      img.classList.add('opacity-0');
    }

    boxSlide.appendChild(img);
    imagensHTML.push(img); // Guarda a referência no array
  });

  let indexAtual = 0;


document.getElementById('barnnerTxt').innerHTML = barnnerTxt[indexAtual]

document.getElementById('barnnerBtn').onclick = () => alert('promocao do barnner')

document.getElementById('barnnerSubTxt').innerText = barnnerSubTxt[indexAtual]


  function trocar() {
    
    
    // Esconde a imagem que está aparecendo agora
    imagensHTML[indexAtual].classList.add('opacity-0');

    // Calcula o próximo índice. 
    // O operador '%' (módulo) faz o número voltar para 0 quando chega no fim da lista.
    indexAtual = (indexAtual + 1) % imagensHTML.length;

document.getElementById('barnnerTxt').innerHTML = barnnerTxt[indexAtual]
    
    document.getElementById('barnnerBtn').onclick = () => alert('promocao do barnner')

    document.getElementById('barnnerSubTxt').innerText = barnnerSubTxt[indexAtual]
    


    // Mostra a próxima imagem
    imagensHTML[indexAtual].classList.remove('opacity-0');
  }

  // Troca a cada 3 segundos
  setInterval(trocar, 5000);
}
bannerSlide();
//////////////////////////////////
const instrucao =`
​"Olá! Seja muito bem-vindo(a) à Tricker! 🚀
​Ficamos muito felizes em ter você aqui. Para facilitar seu pedido, nosso cardápio funciona de forma automática e prática:
​Escolha: Navegue pelos nossos itens e selecione os seus favoritos.
​Carrinho: Adicione os itens ao carrinho de compras.
​Detalhes: No carrinho, você preenche seu endereço e observações (como pontos da carne ou retirada).
​Envio: Clique em enviar e sua lista pronta será enviada diretamente para o nosso WhatsApp!
​Depois disso, é só aguardar nossa confirmação. Bom apetite! ✨"
`
//////////////////////////////////
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

        

//////////////////////////////////
//////////////////////////////////
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
//////////////////////////////////
//////////////////////////////////
async function listarCat(idAtivo,classe) {
let myDb = await getDados()
 
 const dbClasse = myDb.filter(db=>{ 
  const prodClasse = db.classe.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[ ]/g,"")
  
  const slcClasse = classe === prodClasse || !classe
  
    return slcClasse 
 })
  

  const dbCategorias =[...new Set(
dbClasse.map(bl => bl.categoria))]

const navCat = document.getElementById('navCat');
// 1. Limpa o menu uma única vez
navCat.innerHTML = '';

const divTodos = document.createElement('button')
divTodos.className='shadow-sm shadow-gray-500/30 bg-yellow-400 font-bold text-sm px-3 py-1 rounded-lg whitespace-nowrap text-gray-700'
divTodos.innerText='Todos'
divTodos.id='todos'
navCat.appendChild(divTodos)

          /*mecher aqui*/
divTodos.addEventListener('click', () => {
      listarCat('',classe);
      navegacao('cardapio')
      listaProdutos('', '',classe);
    });
    
  if(!idAtivo) {
      divTodos.classList.add('bg-white');
      divTodos.classList.remove('bg-yellow-400');
      
  
    }
    
 dbCategorias.sort((a, b) => a.localeCompare(b));
  
dbCategorias.forEach((item,index)=>{
  
  const idBotao='btCat'+index
  
    
    // 2. Cria o elemento de forma mais "limpa"
    const btn = document.createElement('button');
    
    btn.id = idBotao;
    btn.innerText = item;
    btn.className='shadow-sm shadow-gray-500/30 bg-yellow-400 font-bold text-sm px-3 py-1 rounded-lg whitespace-nowrap text-gray-700'
    
    // 3. Aplica a classe 'active' se for o ID selecionado
    if (idBotao === idAtivo) {
      btn.classList.remove('bg-yellow-400');
      btn.classList.add('bg-white');
      
    
    }
  
    // 4. Evento de clique
    btn.addEventListener('click', () => {
      // Chama a função novamente para atualizar o estado visual (o 'active') 
    
      listarCat(idBotao,classe);
      // Filtra os produtos (supondo que sua função aceite o ID da categoria)
      navegacao('cardapio')
      listaProdutos(item, '',classe);
         
    });

    // 5. Adiciona ao container sem apagar os outros
    navCat.appendChild(btn);
    
  });
  listaProdutos('','',classe)
  navegacao('cardapio')
  
}
////////////////////////////////////////////////////////////////////////////////
async function listaProdutos(idCat, termo,lista){
 
 const myDb = await getDados()
 
  const cardapioGrid = document.getElementById('cardapio-grid'); // Certifique-se que este ID existe no seu HTML
  if (!cardapioGrid) return;
  
  const listaParaFiltrar = myDb.filter(fl=>{
    
    const classeReplace = fl.classe.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[ ]/g,"")

  const listaTratada = classeReplace === lista || !lista 
  
  return listaTratada
    
  }) 
  // 2. Interface: Gerencia botões de visualização
  
  // 3. Filtros (Categoria e Termo)
  const termoBusca = termo.toLowerCase().trim();
  
  const produtosFiltrados = listaParaFiltrar.filter(prod => {
    
    const correspondeCat = (idCat === '' || prod.categoria.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() === idCat.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase());
     
     
    const correspondeNome = prod.nome.toLowerCase().includes(termoBusca);
    
    return correspondeCat && correspondeNome;
  });

  // 4. Validação de Lista Vazia
  if (produtosFiltrados.length === 0) {
    cardapioGrid.innerHTML = 
    `
      <div class="col-span-2 flex flex-col items-center justify-center py-10 text-gray-400">
        <i data-lucide="frown" class="w-10 h-10 mb-2"></i>
        <span class="font-bold">Nenhum item encontrado</span>
      </div>`;
    lucide.createIcons();
    return;
  }
  

  
  // 5. Renderização
  cardapioGrid.innerHTML = '';
  
 produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));

  produtosFiltrados.forEach(prod => {
    
    const prodCard = document.createElement('div');
    
    prodCard.className = 'w-full grid grid-cols-1 px-2';
    
    prodCard.innerHTML = `
   <div class="bg-gray-50 py-4 mt-2 px-2 border-b border-gray-100 grid grid-cols-1 transition-colors rounded-lg relative">

  <div class="flex-grow pr-4 ">
  
   <h3 class=" font-black text-gray-700 uppercase tracking-tight flex">
   
      <span class=" text-lg text-blue-500 ml-2">${prod.nome.trim()}</span>
    
   <i class="w-4 h-4 text-green-500 translate-y-[5px]" data-lucide="corner-right-down"></i>
   </h3>
    </div>
    
    <div id="listProdEmb${prod.id}"></div>
    
    
    </div>`;
    
    cardapioGrid.appendChild(prodCard);
 
   const listProdEmb = document.getElementById(`listProdEmb${prod.id}`)
   
    listProdEmb.innerHTML=''
    
    prod.embalagens.forEach(emb => {
      
  const precoFormatado = emb.preco.replace(/[^0-9,.]/g,"").replace(",",".")
  
  const descontoFormatado = emb.desconto
  
   const precoFinal = precoFormatado - descontoFormatado
   
   const classeDesconto = descontoFormatado > 0.00 ? "" : "hidden";

  const precoDestaque = descontoFormatado > 0.00 ? "text-red-500 text-xl" : "";

   
  const prodEmb = document.createElement('div')
  
    prodEmb.innerHTML= `
    
    
  <div class=" bg-white border border-gray-100 rounded-2xl p-3 shadow-sm relative">
    
      <span class="${classeDesconto} bg-red-500 absolute top-0 right-0 px-1 rounded-b-md font-black text-white  ">
        OFERTA
      </span>
      
      <p class="text-[16px] font-black text-yellow-00 mb-2 italic text-yellow-500  ">${emb.tipo}</p>
      <div class="flex items-center justify-between">
      
     
        <span class="text-sm font-black tracking-wide flex flex-col">
        
         <span id="tr-${emb.cod}"  class="${classeDesconto}  text-gray-400 ml-1 text-sm  line-through">De:${precoFormatado.replace(".",",")} R$</span>
        
        <span class="text-lg ${precoDestaque}">Por: 
        ${precoFinal.toFixed(2)} R$
      </span>
       
        </span>
        
        <button id="bt+${emb.cod}" class="bg-yellow-400 text-gray-700 rounded-lg p-1 shadow-sm active:scale-90 transition" onclick="openModal('${emb.cod}','${prod.nome}','${emb.tipo}','${precoFinal.toFixed(2)}')">
        <i class="W-6 H-6" data-lucide="shopping-basket"></i>
        </button>
      </div>
    </div>    
    
    `
  
  listProdEmb.appendChild(prodEmb)

})
    
    
    
    // 6. Persistência Visual: Verifica se o item já está no carrinho
    const qtdNoCarrinho = meuCarrinho.filter(item => item.id === prod.id).length;
    
    if (qtdNoCarrinho >= 1) {
      document.getElementById(`btn-${prod.id}`).classList.add('hidden');
      const seletor = document.getElementById(`seletor-${prod.id}`);
      seletor.classList.remove('hidden');
      document.getElementById(`num-${prod.id}`).innerText = qtdNoCarrinho;
    }
  });
  
  lucide.createIcons();
}
//////////////////////////////////////////////////////////////////////////////
let currentQty 
let unitPrice 

function openModal(cod,nome, embalagem, preco,curQtd){
  
  if(!curQtd) curQtd =1
  currentQty = curQtd


  preco = preco.replace(/[^0-9,.]/g, "")
  
  unitPrice = preco.replace(",",".");
  currentQty = 1;
  
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
        <div class="text-3xl font-black text-gray-900" id="modalProdPreco">${preco}</div>
      </div>
      
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
        <i data-lucide="shopping-cart" class="w-4 h-4 text-white"></i>
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
function confirmAdd(cod,nome,embalagem,preco) {
  // Aqui você integraria com sua lógica de carrinho/comanda


  const produto = {
        cod: cod,
        nome:nome,
        embalagem:embalagem,
        preco: preco.replace(/[^0-9,.]/g,""),
        qtd: Number(currentQty)
    };
    
    
  const repetido = meuCarrinho.find(x=>x.cod === cod)
  
  if(repetido){
  
    
    repetido.qtd = repetido.qtd += Number(currentQty)
    
  }else{
    
  meuCarrinho.push(produto)
  
  }
 alert(`${currentQty} item(s) adicionado(s)!`);


    let totItens = document.getElementById('qtd-itens')  

    let  totalCarrinho= meuCarrinho.reduce((acumulador, p) => {
    return acumulador + p.qtd;
}, 0); // O '0' é o valor inicial da soma

      
       totItens.innerText= totalCarrinho

atualizarCarrinho()
  closeModal();
}
function atualizarCarrinho() {
   
    
  const container = document.getElementById("itensCarrinho");
  const totalElemento = document.getElementById("valorTotal");
  
  // Limpa a lista antes de renderizar
  container.innerHTML = "";

  // 1. Renderiza os Itens
  meuCarrinho.forEach(item => {
      
    container.innerHTML += `

      <div class="flex justify-between items-center mb-2 pb-2 border-b border-dashed border-gray-500">
              
              <button onclick="openModal('${item.cod}','${item.nome}','${item.embalagem}','${item.preco}','${item.qtd}')">
              
                <span class="font-medium text-gray-700">
                
                <i class="w-4 h-4" data-lucide="pencil"></i>
                ${item.qtd}x ${item.nome}- ${item.embalagem}<small class="text-[10px] text-gray-400"> ( ${item.preco} Un. )</small></span>
                <span class="font-bold">R$ ${(item.preco * item.qtd).toFixed(2)}</span>
                
                </button>
                
            </div>
      
    `;
  });

  // 2. O "Reduce" em ação para o total
  const total = meuCarrinho.reduce((acc, item) => acc + parseFloat((item.preco*item.qtd)) ,0);
  
  totalElemento.innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
function enviarWhatsApp() {
  
document.getElementById('loading').classList.remove('hidden')

  const userDados =JSON.parse( localStorage.getItem('userDados')) || []
  const endereco = `${userDados.rua},${userDados.casa} - ${userDados.bairro}`
  
  const numeroTelefone = "5522997263224"; // Substitua pelo seu número (com DDD)
  // Centralizando a formatação de moeda para evitar repetição
const formatarMoeda = (valor) => 
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Simulando um número de pedido aleatório ou sequencial

const numeroPedido = Date.now().toString().slice(-6); // Pega os últimos 6 dígitos do timestamp

let mensagem = `📋 *Pedido n° ${numeroPedido}*\n\n`;

mensagem += `*Enviar para: ${userDados.nome}\n\n`;

mensagem += `*Itens:*\n`;

meuCarrinho.forEach(item => {
  // O emoji ➡️ e o formato "1x NOME" conforme a imagem
  mensagem += `➡️ ${item.qtd}x ${item.nome.toUpperCase()} - ${item.preco}\n\n`;
  
  // Caso tenha observações ou opcionais (como os molhos da imagem)
  if(item.observacao) {
    mensagem += `   _OBS: ${item.observacao}_\n`;
  }
});

// Seção de Pagamento e Entrega (ajuste conforme seus objetos de dados)
//mensagem += `\n💳 *${userDados.pagamento || "Cartão"}*\n\n`;

// Detalhes de Delivery
const taxaEntrega = 3.00; // Exemplo fixo da imagem
mensagem += `🛵 *Delivery* (taxa de: ${formatarMoeda(taxaEntrega)})\n`;
mensagem += `🏠 ${endereco || "Endereço não informado"}\n`;
mensagem += `(Estimativa: entre 20~60 minutos)\n\n`;

// Cálculo do Total
const totalProdutos = meuCarrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);

const totalGeral = totalProdutos + taxaEntrega;

mensagem += `*Total: ${formatarMoeda(totalGeral)}*\n\n`;

mensagem += `Obrigado pela preferência, se precisar de algo é só chamar! 😉`;

/* Envio */
const numeroLimpo = numeroTelefone.replace(/\D/g, '');
const url = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;

window.open(url, '_blank');

  window.location.reload()
}
//////////////////////////////////
//////////////////////////////////
function carrinhoFloat(id){

const span = document.getElementById(`num-${id}`);
  
  const contaItens = meuCarrinho.filter(cont => cont.id === id).length
    
    
    if (contaItens < 1) {
  // Se chegar a zero, troca os botões na interface
  document.getElementById(`seletor-${id}`).classList.add('hidden');
  document.getElementById(`btn-${id}`).classList.remove('hidden');
  qtd = 1; // Reseta o contador visual para a próxima vez
}
    
    
    span.innerText = contaItens;

   
let totItens = document.getElementById('qtd-itens')  

    let  totalCarrinho= document.getElementById('total-carrinho') 
       
       totItens.innerText= meuCarrinho.length

      
     const totalGeral = meuCarrinho.reduce((acumulador, p) => {
    return acumulador + p.preco;
}, 0); // O '0' é o valor inicial da soma

     const totalFormatado = totalGeral.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});
     
     totalCarrinho.innerText = totalFormatado
   
   
}
//////////////////////////////////
//////////////////////////////////
function verCarrinho(){
    
    if(meuCarrinho.length === 0){
        
        alert('Carrinho Vazio 🥲')
        
    }else{
    
    const navBarCat = document.getElementById('navCat')
  
  navegacao('modalCarrinho')
  
    const span = document.getElementsByClassName("close")[0];

    span.addEventListener('click',() =>{
    
      navegacao('home')
      navBarCat.classList.remove('hidden')
     
    } )
    
    }


}
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
function spanInterativos(cod) {
  
  
  
  
}
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//

function enviarPushOferta(titulo, mensagem, idProduto) {
  if (Notification.permission === "granted") {
    const options = {
      body: mensagem,
      icon: 'caminho/para/seu/thumb-gelado.png', // O thumb que criamos
      badge: 'caminho/para/seulogo-preto.png', // Ícone pequeno da barra de status
      image: 'caminho/para/imagem-grande-promo.jpg', // Imagem que expande no Android
      vibrate: [200, 100, 200], // Vibração "chamativa"
      tag: 'promo-agora', // Evita duplicar notificações iguais
      data: { id: idProduto } // Dados extras para o clique
    };

            } 
            // 3. Se não, solicita permissão ao usuário
            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        criarNotificacao();
                    } else {
                        status.innerText = "Permissão negada";
                    }
                });
            } else {
                status.innerText = "Permissão bloqueada nas configurações";
            }
        }





    const notification = new Notification(titulo, options);

    // O que acontece quando o cliente clica na notificação?
    notification.onclick = function(event) {
      event.preventDefault();
      window.focus();
      
      // Abre a promoção específica no seu APK
      mostrarPromocao(this.data.id); 
      
      notification.close();
    
  
}
// Exemplo de uso: Disparar após 3 segundos para testar
setTimeout(() => {
  
  enviarPushOferta(
    "🍺 CERVEJA TRINCANDO!", 
    "Spaten Lata por R$ 3,89? Só agora no Depósito!",
    10
  );
}, 3000);

document.getElementById('form-cadastro').addEventListener('submit', function(e) {
  e.preventDefault();
  // Aqui você salvaria os dados no banco ou localStorage
  document.getElementById('modal-cadastro').style.display = 'none';
  alert('Bem-vindo(a)!');
});


function solicitarPermissao() {
  if (!("Notification" in window)) {
    console.log("Este navegador não suporta notificações desktop");
    return;
  }

  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("Permissão concedida!");
    }
  });
}
/*==========================================================================================================================================================*/


function cadastrarEnderecoAlternativo(e){
  
  e.preventDefault(); // Impede a página de recarregar
  
  const userDados = JSON.parse(localStorage.getItem('userDados'))
   
    userDados.rua = document.getElementById('inputRuaAlt').value

    userDados.casa =   document.getElementById('inputCasaAlt').value

    userDados.bairro =   document.getElementById('inputBairroAlt').value

    userDados.cep =   document.getElementById('inputCEPAlt').value

    userDados.complemento =  document.getElementById('inputComplementoAlt').value

  localStorage.setItem('userDados',JSON.stringify(userDados))
  alert('Endereço Cadastrado')
  navegacao('home')
  slcEnderecoModal()    
}
//////////////////////////////////
//////////////////////////////////
function obterEndereco(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    fetch(url)
        .then(response => response.json())
        .then(dados => {
            if (dados.address) {
                const rua = dados.address.road || "Rua não encontrada";
                const bairro = dados.address.suburb || dados.address.neighbourhood || "";
                const cidade = dados.address.city || dados.address.town || "";

                // Preenche o input da modal automaticamente
                const nomeRua = `${rua}`;
                const nomeBairro = `${bairro}`;
                
      const btnInsert = document.getElementById('insertLocation')
      
      btnInsert.addEventListener('click',()=>{
  
  document.getElementById('inputRua').value = nomeRua;
                
  document.getElementById('inputBairro').value = nomeBairro;

})
                
                document.getElementById('status-localizacao').innerHTML = `${nomeRua}, ${nomeBairro} `;
                
                document.getElementById('status-localizacao').style.color = "#22c55e"; // Verde
            }
        })
        .catch(erro => {
            console.error("Erro na geocodificação:", erro);
        });
}


// Quando o App abre, solicita a posição
navigator.geolocation.getCurrentPosition(
    (pos) => {
        obterEndereco(pos.coords.latitude, pos.coords.longitude);
    },
    (erro) => {
        document.getElementById('status-localizacao').innerText = "❌ GPS desativado.";
        
    }
);


// No final do seu script principal
lucide.createIcons();

