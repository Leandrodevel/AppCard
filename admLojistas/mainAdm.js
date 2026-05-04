verificarSessao();
async function qtdVendidos() {
  try {
    const produtos = await obterDados();
    
    // Retorna apenas produtos que possuem ao menos uma embalagem com vendas
    return produtos.filter(p => {
      return p.embalagens.some(emb => emb.vendas > 0);
    });
  } catch (erro) {
    console.error("Erro ao buscar dados:", erro);
    return [];
  }
}
  const classesCateg = {
    'Bebidas': ['Águas', 'Cachaças', 'Cervejas', 'Whiskys', 'Vodkas', 'Destilados', 'Aperitivos', 'Refrigerantes', 'Energéticos','Combos','Drink'],
    'Petiscos': ['Amendoins', 'Azeitonas', 'Queijos'],
    'Carvão e Gelo': ['Carvão Vegetal', 'Gelo em Cubo', 'Gelo de Coco'],
    'Snacks Salgados': ['Salgadinhos', 'Batata Chips'],
    'Doces e Chocolates': ['Barras de Chocolate', 'Caixas de Bombom'],
    'Copos e Descartáveis': ['Copos 300ml', 'Canudos', 'Guardanapos'],
    'Tabacaria': ['Cigarros', 'Isqueiros', 'Palheiros'],
    'Utensílios': ['Abridores', 'Saca-rolhas', 'Tímidas'],
    'Bomboniere': ['Balas', 'Chicles', 'Pirulitos']
};

const optDefault = new Option('Selecione', '');
optDefault.disabled = true;
optDefault.selected = true;
cadClasse.add(optDefault);

Object.keys(classesCateg).forEach(cc=>{
 const optCategoria = document.createElement('option')
  optCategoria.value=cc
  optCategoria.innerText = cc
 document.getElementById('cadClasse').appendChild(optCategoria)   
    
})

cadClasse.addEventListener('change', () => {
    cadCategoria.innerHTML = '';
    
    classesCateg[cadClasse.value].forEach(item => {
        cadCategoria.add(new Option(item, item));
    });
});


    


// Função para salvar os dados atualizados
/*function salvarDados(dados) {
    localStorage.setItem('estoqueDeProdutos', JSON.stringify(dados));
    renderizarAdmin();
}*/
async function variacao(){
    const dbVariacoes = await obterDados()

const cadMarca =   document.getElementById('cadMarca')
const cadNome =   document.getElementById('cadNome')
const keyVariacao = document.getElementById('keyVariacao')
 const optkeyVariacao=  new Option('Variação de...','')   
    keyVariacao.add(optkeyVariacao)
    optkeyVariacao.disabled=true
    optkeyVariacao.selected=true

    
    dbVariacoes.forEach(dv=>{
    keyVariacao.add(new Option(dv.nome,dv.id))
    })
    
  keyVariacao.addEventListener('change', () => {
    
    cadCategoria.innerHTML = '';
    cadClasse.innerHTML = '';
    cadMarca.innerHTML = '';
    cadNome.innerHTML = '';
    cadMarca.disabled=true  
    cadNome.disabled=true  
    cadCategoria.disabled=true  
    cadClasse.disabled=true
    
  const variacaoEscolida = dbVariacoes.filter(ve=>ve.id === keyVariacao.value
  )
  alert(JSON.stringify(variacaoEscolida))
    cadCategoria.add(new Option(variacaoEscolida[0].categoria,variacaoEscolida[0].categoria))
    cadClasse.add(new Option(variacaoEscolida[0].classe,variacaoEscolida[0].classe))
    
    cadMarca.value = variacaoEscolida[0].marca
    cadNome.value = variacaoEscolida[0].nome
    });

}
variacao()

async function renderizarCombosParaMontar() {
    // 1. Obter os dados (certifique-se que obterDados() está importada)
    const produtos = await obterDados();
  
    const sectionCombo = document.getElementById('combosParaMontar');
    // Limpa a seção antes de renderizar para evitar duplicatas
    sectionCombo.innerHTML = '';
    const container = document.createElement('div');
    container.classList = 'w-full m-4'; // Removi o flex centralizado aqui para não quebrar o grid abaixo
    
    container.innerHTML = `
<!-- Botão: Centralizado horizontalmente -->
    <div class="flex justify-center mb-6">
        <button onclick="definirFiltro('cadastroCombo')" class="w-full max-w-[200px] bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-sm">
            <i class="fa-solid fa-plus"></i> NOVO COMBO
        </button>
    </div>
            
    <!-- Filtros: mx-auto garante centralização se houver largura definida -->
    <div class="flex flex-col gap-4 mb-8 p-4 ring-2 ring-red-500 rounded-xl bg-white shadow-sm">
        
        <div class="relative w-full">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-3.5 text-gray-400"></i>
            <input type="text" id="busca-combo" placeholder="Buscar combo..." 
                class="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-200">
        </div>

        <select id="filtro-categoria" class="w-full px-4 py-3 border rounded-xl bg-white outline-none">
            <option value="">Todas as Categorias</option>
            <option value="churrasco">Churrasco</option>
            <option value="bebidas">Bebidas</option>
        </select>
    </div>

    <!-- Grid de Combos -->
    <div id="grid-combos" class="grid grid-cols-1 gap-6 w-full">
        <!-- Itens aqui -->
    </div>
    `;

    // CORREÇÃO: appendChild espera o OBJETO elemento, não uma string 'container'
    sectionCombo.appendChild(container);

// 1. Renderiza os cards primeiro
    renderizarLista(); 
    // 2. SÓ DEPOIS disso você inicializa os ícones
    // Isso vai procurar todas as tags data-lucide que acabaram de ser criadas
    if (window.lucide) {
        lucide.createIcons();
    }

}
 function renderizarCadastroCombo(){
 
 const sectionCombo = document.getElementById('cadastroCombo');
    // Limpa a seção antes de renderizar para evitar duplicatas
    sectionCombo.innerHTML = '';
    const container = document.createElement('div');
    container.classList = 'w-full m-4'; // Removi o flex centralizado aqui para não quebrar o grid abaixo
    container.innerHTML = `
 <div class="max-w-4xl mx-auto py-8 px-4">
        <div class="mb-8 border-b border-gray-300 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">Gerenciamento de Produto</h1>
                <p class="text-gray-500">ID do Sistema: <span id="display-id" class="font-mono text-orange-600">---</span></p>
            </div>
            <div class="flex gap-4 w-full justify-center">
            <button onclick="salvarDados()" class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95">
                <i class="fa-solid fa-floppy-disk mr-2"></i> SALVAR COMBO
            </button>
             <button onclick="definirFiltro('combosParaMontar')" class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded-lg font-bold transition-all shadow-lg active:scale-95">
              LISTAR COMBOS
             </button>
        </div>
        </div>

        <div class="grid grid-cols-1 gap-6">
            
            <section class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h2 class="text-sm uppercase tracking-wider font-bold mb-4 text-orange-500">Informações Básicas</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Nome do Produto</label>
                        <input type="text" id="input-nome" class="w-full p-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none transition-all">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Categoria</label>
                        <input type="text" id="input-categoria" class="w-full p-3 border rounded-xl bg-gray-50">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Marca / Origem</label>
                        <input type="text" id="input-marca" class="w-full p-3 border rounded-xl bg-gray-50">
                    </div>
                </div>
            </section>

            <section class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h2 class="text-sm uppercase tracking-wider font-bold mb-4 text-orange-500">Valores e Estoque</h2>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Preço Venda</label>
                        <div class="relative">
                            <span class="absolute left-3 top-3 text-gray-400 text-sm">R$</span>
                            <input type="number" id="input-preco" step="0.01" class="w-full p-3 pl-10 border rounded-xl font-bold text-green-600 outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Desconto</label>
                        <input type="text" id="input-desconto" class="w-full p-3 border rounded-xl bg-gray-50">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Status</label>
                        <select id="input-ativo" class="w-full p-3 border rounded-xl bg-gray-50 font-medium">
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-gray-400 uppercase mb-1">Cód. Barra</label>
                        <input type="text" id="input-cod" readonly class="w-full p-3 border rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed">
                    </div>
                </div>
            </section>

            <section class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div class="mb-8">
                    <h2 class="text-sm uppercase tracking-wider font-bold mb-4 text-orange-500">Acompanhamentos do Combo</h2>
                    <div id="container-acompanhamentos" class="flex flex-wrap gap-2">
                        </div>
                </div>

                <div>
                    <h2 class="text-sm uppercase tracking-wider font-bold mb-4 text-orange-500">Itens Adicionais (Extras)</h2>
                    <div class="overflow-hidden border rounded-xl">
                        <table class="w-full text-left">
                            <thead class="bg-gray-50 border-b">
                                <tr>
                                    <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Descrição</th>
                                    <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Valor</th>
                                    <th class="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-center w-20">Ações</th>
                                </tr>
                            </thead>
                            <tbody id="corpo-tabela-adicionais" class="divide-y divide-gray-100">
                                </tbody>
                        </table>
  
                    </div>
                                     <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
    <input type="text" id="novo-adc-nome" placeholder="Nome (ex: Queijo)" class="p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300">
    <div class="relative">
        <span class="absolute left-2 top-2 text-gray-400 text-sm">R$</span>
        <input type="number" id="novo-adc-preco" placeholder="0.00" step="0.01" class="w-full p-2 pl-8 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-300">
    </div>
    <button onclick="adicionarAdicional()" class="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
        <i class="fa-solid fa-plus mr-1"></i> ADICIONAR
    </button>
</div>
                </div>
            </section>
        </div>
    </div>
    
    
    `
  sectionCombo.appendChild(container);

    // Após anexar ao DOM, você pode chamar a função que desenha os cards dentro do #grid-combos
   renderizarPagina();
     
 }



async function renderizarAdmin() {
    const produtos = await obterDados();
  
    const container = document.getElementById('listaAdmin');
      container.innerHTML = '';
    const htools = document.createElement('div')
    htools.className = 'flex flex-col gap-4 w-full'
    htools.innerHTML = `

    <button onclick="abrirModalCadastro()" 
    class=" bg-red-400 hover:bg-red-500 text-gray-900 font-bold py-2 px-4 rounded-xl shadow-sm ">
        + Novo Produto
      </button>

      <input type="text" id="inputBusca" oninput="renderizarAdmin()" placeholder="Pesquisar por nome ou código..." 
             class="w-full p-4 rounded-2xl border-none shadow-md focus:ring-2 focus:ring-red-400 outline-none">
  

    `
    container.appendChild(htools)

 const termoBusca = document.getElementById('inputBusca').value.toLowerCase();

   
    // Processamos as variações para exibição individual
    let listaProcessada = [];
    produtos.forEach((prod, indexProd) => {
        prod.embalagens.forEach((emb, indexEmb) => {
            if (prod.nome.toLowerCase().includes(termoBusca) || emb.cod.includes(termoBusca)) {
                listaProcessada.push({ ...prod, emb, indexProd, indexEmb });
            }
        });
    });
    listaProcessada.forEach(item => {
        
        const pOriginal = parseFloat(item.emb.preco.replace(",", "."));
        const pDesconto = parseFloat(item.emb.desconto  );
        const pFinal = pOriginal - pDesconto;
        const estaAtivo = item.emb.ativo !== false;

        const card = document.createElement('div');
        card.className = `bg-white p-4 rounded-2xl shadow-sm border-2 ${estaAtivo ? 'border-transparent' : 'border-red-100 opacity-60'}`;
        const temDesconto = item.emb.desconto > 0? '':'hidden'
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <h3 class="font-bold text-lg">${item.nome}</h3>
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">${item.emb.vendas} vendidos</span>
                    </div>
                    <p class="text-sm font-bold text-red-600">${item.emb.tipo}</p>
                </div>
                
                <div class="flex flex-col items-end">
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" ${estaAtivo ? 'checked' : ''} onchange="toggleAtivo(${item.indexProd}, ${item.indexEmb})">
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-400"></div>
                        <span class="ml-2 text-xs font-bold text-gray-400 uppercase">${estaAtivo ? 'Ativo' : 'Off'}</span>
                    </label>
                </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t pt-4">
                <div class="flex flex-col">
                <small class="text-gray-500 line-through ${temDesconto}">  de: ${item.emb.preco}</small>
                </div>

                    <span class="text-[10px] text-gray-400 uppercase font-bold">Preço Final</span>
                    <span class="font-black text-lg text-gray-700 ">R$ ${pFinal.toFixed(2).replace(".", ",")}</span>
                <button onclick="editarDesconto(${item.indexProd}, ${item.indexEmb})" class="flex items-center justify-center gap-1 bg-red-50 text-red-600 p-2 rounded-xl text-xs font-black hover:bg-red-100 transition">
                 ${parseFloat(item.emb.desconto).toFixed(2).replace(".",",")}  🏷️ DESC.
                </button>
                
                <button onclick="editarPreco(${item.indexProd}, ${item.indexEmb}, 'estoque')" class="flex items-center justify-center gap-1 bg-blue-50 text-blue-600 p-2 rounded-xl text-xs font-black hover:bg-blue-100 transition">
                   📦 ESTOQUE (${item.emb.estoque || 0})
                </button>

                <button onclick="toggleDestaque(${item.indexProd}, ${item.indexEmb})" class="flex items-center justify-center gap-1 ${item.emb.destaque ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-400'} p-2 rounded-xl text-xs font-black transition">
                   ⭐ DESTAQUE
                </button>
            </div>

            <div class="flex justify-end gap-4 mt-4">
                <button onclick="excluirItem(${item.indexProd}, ${item.indexEmb})" class="text-xs text-red-400 font-bold hover:underline">Apagar Variação</button>
            </div>
        `;
        container.appendChild(card);
      
    });
    lucide.createIcons()
}

// --- FUNÇÕES DE CONTROLE ---
async function toggleAtivo(idxProd, idxEmb) {
    let produtos = await obterDados();
    let produto = produtos[idxProd];
    
    // Inverte o status da embalagem específica
    produto.embalagens[idxEmb].ativo = !produto.embalagens[idxEmb].ativo;
    
    // Salva o ARRAY INTEIRO de embalagens de volta no banco
    await atualizaDadosEmbalagens(produto.id, produto.embalagens);
}
async function toggleDestaque(idxProd, idxEmb) {
    
    let dados = await obterDados();
    
    dados[idxProd].embalagens[idxEmb].destaque = !dados[idxProd].embalagens[idxEmb].destaque;
    
    const novoDado =[dados[idxProd].embalagens[idxEmb]]
    
    atualizaDadosEmbalagens(dados[idxProd].id, novoDado);

}

async function editarDesconto(idxProd, idxEmb) {
    let dados = await obterDados();
    
    const msg =  "Valor do desconto (ex: 2.50):"
    const valor = prompt(msg).replace(",",".");
    
    if (valor !== null) {
    
     dados[idxProd].embalagens[idxEmb].desconto = valor
        
      const novoDado =[dados[idxProd].embalagens[idxEmb]]
      
      atualizaDadosEmbalagens(dados[idxProd].id, novoDado);
    }
}

async function excluirItem(idxProd, idxEmb) {
    let dados =await obterDados();
    
    const slRemove = dados[idxProd].embalagens[idxEmb]
    
    const separaSel = dados[idxProd]. embalagens.filter(sl=> sl.cod !== slRemove.cod)
    
    if(separaSel.length===0){
        
      if (confirm("Nao a mais variações   deseja apagar o produto?")) {
          
        apagaProduto(dados[idxProd].id)
    }
    }else if(separaSel.length > 0){
        
  //alert(JSON.stringify(separaSel)) 
  if (confirm("Tem certeza que deseja apagar esta variação?")) {
        
  const novoDado = separaSel
  
        atualizaDadosEmbalagens(dados[idxProd].id, novoDado);

    }
    }

    
}



  
  // --- FUNÇÕES DO MODAL ---
function abrirModalCadastro() {
    document.getElementById('modalCadastro').classList.remove('hidden');
}
async function fecharModalCadastro() {
      
    // 2. Obter banco
    let dados = await obterDados()
    // 3. Objeto da Embalagem seguindo seu padrão
    document.getElementById('modalCadastro').classList.add('hidden');
    document.getElementById('formCadastro').reset();
}


// --- LÓGICA DE SALVAMENTO ---
const gerarID = () => {
    const letras = Math.random().toString(36).substring(2, 4).toUpperCase();
    const data = Date.now();
    return letras + data;
}
// --- LOGICA DE SALVAMENTO CORRIGIDA ---
document.getElementById('formCadastro').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 1. Capturar valores (Ajuste os IDs no HTML para evitar duplicidade)
    const idExistente = document.getElementById('keyVariacao').value;
    const classe = document.getElementById('cadClasse').value;
    const categoria = document.getElementById('cadCategoria').value;
    const marca = document.getElementById('cadMarca').value;
    const nome = document.getElementById('cadNome').value; // Certifique-se que este ID é único
    
    const skuNovo = 'SKU' + Date.now();
    const tipo = document.getElementById('cadTipo').value;
    const preco = document.getElementById('cadPreco').value;
    const estoque = parseInt(document.getElementById('cadEstoque').value);
    const vendas = parseInt(document.getElementById('cadVendas').value);

    const novaEmbObj = {
        cod: skuNovo,
        tipo: tipo,
        preco: preco.replace(",", "."),
        estoque: estoque,
        vendas: vendas,
        desconto: "0.00",
        ativo: true,
        destaque: false
    };

    const produtosAtuais = await obterDados();
    const produtoExistente = produtosAtuais.find(p => p.id == idExistente);

    if (produtoExistente) {
        // MODO VARIAÇÃO: Adiciona ao array existente
        const novasEmbalagens = [...produtoExistente.embalagens, novaEmbObj];
        
        const { error } = await _supabase
            .from('estoque')
            .update({ embalagens: novasEmbalagens })
            .eq('id', produtoExistente.id);

        if (error) alert("Erro ao adicionar variação: " + error.message);
        else alert("Variação adicionada!");

    } else {
        // MODO NOVO PRODUTO
        const novoProduto = {
            classe: classe,
            categoria: categoria,
            marca: marca,
            nome: nome,
            embalagens: [novaEmbObj]
        };

        const { error } = await _supabase
            .from('estoque')
            .insert(novoProduto);

        if (error) alert("Erro ao criar produto: " + error.message);
        else alert("Produto cadastrado com sucesso!");
    }

    fecharModalCadastro();
    renderizarAdmin();
});


function navegacao(openId) {
    const allpages = ['admProdutos','dashboard'];
    
    switch(openId){
        case 'admProdutos':
              definirFiltro('listaAdmin')
        break;
        
    }
    allpages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
document.getElementById(openId).style.display = 'flex';
}

    // Simulando dados vindo de um banco (Supabase/Firebase)

      async function renderizarLista() {
    const db = await obterDados();
    // Filtra apenas os que são classe combo
    const buscaCombos = db.filter(comb => comb.classe === 'combo');

    // Limpamos a lista antes de começar para não duplicar ao re-renderizar
    let listaCombos = [];

    for (const item of buscaCombos) {
        // Criamos o objeto DIRETAMENTE (sem o [])
        const objetoCombo = {
            id: item.id,
            nome: item.nome,
            categoria: item.categoria,
            // Ajuste aqui: se embalagens for array, pegamos o índice 0
            preco: item.embalagens[0]?.preco || 0,
            ativo: item.embalagens[0]?.ativo || false,
            // Se itens for para contar bolinhas, pegamos a array de itens/adicionais
            itens: item.embalagens[0]?.adicionais || [],
            imagem: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80'
        };

        listaCombos.push(objetoCombo);
    }

    const grid = document.getElementById('grid-combos');
    if (!grid) return;

    grid.innerHTML = listaCombos.map(combo => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all group">
            <div class="relative h-40 overflow-hidden">
                <img src="${combo.imagem}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-3 left-3">
                    <span class="${combo.ativo ? 'bg-green-500' : 'bg-gray-500'} text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        ${combo.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
            </div>

            <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg leading-tight capitalize">${combo.nome}</h3>
                        <p class="text-xs text-gray-400 font-medium uppercase">${combo.categoria}</p>
                    </div>
                    <span class="text-orange-600 font-black text-lg italic">R$ ${parseFloat(combo.preco).toFixed(2).replace('.', ',')}</span>
                </div>

                <div class="mt-4 pt-4 border-t border-dashed flex items-center justify-between">
                    <div class="flex -space-x-2">
                        ${combo.itens.slice(0, 3).map(() => `
                            <div class="w-7 h-7 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-orange-600">
                                <i data-lucide="check" class="w-3 h-3"></i>
                            </div>
                        `).join('')}
                        ${combo.itens.length > 3 ? `<div class="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500 font-bold">+${combo.itens.length - 3}</div>` : ''}
                    </div>
                    
                    <div class="flex gap-2">
                        <button onclick="editarCombo('${combo.id}')" class="p-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-lg text-gray-500 transition-colors">
                            <i data-lucide="edit-3" class="w-4 h-4"></i>
                        </button>
                        <button onclick="excluirCombo('${combo.id}')" class="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-lg text-gray-500 transition-colors">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // ESSENCIAL: Recriar os ícones do Lucide após inserir no HTML
    if (window.lucide) {
        lucide.createIcons();
    }
}

        function editarCombo(id) {
            alert("Redirecionando para edição do combo: " + id);
            // Aqui você usaria: window.location.href = `cadastro.html?id=${id}`;
        }

        function excluirCombo(id) {
            if(confirm("Deseja realmente remover este combo?")) {
                const index = listaCombos.findIndex(c => c.id === id);
                listaCombos.splice(index, 1);
                renderizarLista();
            }
        }

        // Filtro de Busca Simples
      /*
        document.getElementById('busca-combo').addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase();
            const filtrados = listaCombos.filter(c => c.nome.toLowerCase().includes(termo));
            
            // Aqui uma lógica simples de renderização filtrada
            if(filtrados.length === 0) {
                document.getElementById('grid-combos').classList.add('hidden');
                document.getElementById('empty-state').classList.remove('hidden');
            } else {
                document.getElementById('grid-combos').classList.remove('hidden');
                document.getElementById('empty-state').classList.add('hidden');
                // Re-renderiza com os filtrados (em uma app real você passaria o array para a função)
            }
        });

*/

   // Dados iniciais
        const produtoCombo = {
            id_comercial:gerarID() ,
            nome: 'combo familia',
            classe: 'combos',
            categoria: 'combo de churrasco',
            marca: 'da casa',
            embalagens: [{
                cod: gerarID(),
                tipo: 'completo',
                preco: 59.90,
                estoque: '',
                vendas: '',
                desconto: "0.00",
                ativo: true,
                acompanhamentos: ['farofa', 'vinagrete', 'pão de alho', 'salpicão', 'feijão tropeiro'],
                adicionais: [
                    { nome: 'carne extra', preco:" 10.00" },
                    { nome: 'batata extra', preco: 12.00 },
                ]
            }]
        };

        // Função para preencher a tela
        function renderizarPagina() {
            const emb = produtoCombo.embalagens[0];

            // Textos e Inputs
            document.getElementById('display-id').innerText = produtoCombo.id_comercial;
            document.getElementById('input-nome').value = produtoCombo.nome;
            document.getElementById('input-categoria').value = produtoCombo.categoria;
            document.getElementById('input-marca').value = produtoCombo.marca;
            document.getElementById('input-preco').value = emb.preco.toFixed(2);
            document.getElementById('input-desconto').value = emb.desconto.replace(",",".");
            document.getElementById('input-cod').value = emb.cod;
            document.getElementById('input-ativo').value = emb.ativo.toString();

            // Renderizar Badges de Acompanhamentos
            const containerAcomp = document.getElementById('container-acompanhamentos');
            containerAcomp.innerHTML = emb.acompanhamentos.map((item, index) => `
                <div class="bg-orange-50 border border-orange-200 px-4 py-2 rounded-lg text-sm font-medium text-orange-800 flex items-center gap-3">
                    ${item}
                    <button onclick="removerAcompanhamento(${index})" class="hover:text-red-600 transition-colors">
                        x<i class="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
            `).join('') + `
                <button onclick="adicionarAcompanhamento()" class="bg-gray-100 hover:bg-gray-200 border-dashed border-2 border-gray-300 px-4 py-2 rounded-lg text-sm font-bold text-gray-500 transition-all">
                    + NOVO
                </button>
            `;

            // Renderizar Tabela de Adicionais
            const corpoTabela = document.getElementById('corpo-tabela-adicionais');
            corpoTabela.innerHTML = emb.adicionais.map((adc, index) => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 text-sm text-gray-700 font-medium">${adc.nome}</td>
                    <td class="px-4 py-3 text-sm text-right font-bold text-gray-900">R$ ${adc.preco}</td>
                    <td class="px-4 py-3 text-center">
                        <button onclick="removerAdicional(${index})" class="text-red-400 hover:text-red-600 p-2">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
             lucide.createIcons()
        }
        // Funções de Ação
        function removerAcompanhamento(index) {
            produtoCombo.embalagens[0].acompanhamentos.splice(index, 1);
            renderizarPagina();
        }
        function adicionarAcompanhamento() {
            const novo = prompt("Nome do acompanhamento:");
            if (novo) {
                produtoCombo.embalagens[0].acompanhamentos.push(novo.toLowerCase());
                renderizarPagina();
            }
        }

        function removerAdicional(index) {
            produtoCombo.embalagens[0].adicionais.splice(index, 1);
            renderizarPagina();
        }

        async function salvarDados() {
    // 1. Captura os valores dos inputs NO MOMENTO do clique
    const nome = document.getElementById('input-nome').value;
    const categoria = document.getElementById('input-categoria').value;
    const marca = document.getElementById('input-marca').value;
    const preco = document.getElementById('input-preco').value.replace(",", ".");
    const ativo = document.getElementById('input-ativo').value === "true";

    // 2. Monta um NOVO objeto com os dados frescos
    // Usamos o 'spread operator' (...) para manter os dados fixos (como acompanhamentos)
    const dadosParaEnviar = {
        ...produtoCombo, // Pega a estrutura base (classe, acompanhamentos, etc)
        id_comercial: gerarID(), // Gera um ID novo a cada salvamento
        nome: nome,
        categoria: categoria,
        marca: marca,
        embalagens: [{
            ...produtoCombo.embalagens[0], // Mantém cod, tipo, acompanhamentos
            preco: preco,
            ativo: ativo
        }]
    };

    console.log("Enviando dados atuais:", dadosParaEnviar);

    // 3. Envia para o Supabase
    const { error } = await _supabase
        .from('estoque')
        .insert([dadosParaEnviar]); // O Supabase prefere receber um array []

    if (error) {
        alert("Erro ao criar produto: " + error.message);
    } else {
        alert("Produto cadastrado com sucesso!");
        // Opcional: Limpar os campos após o sucesso
    }
}

        function adicionarAdicional() {
    const nomeInput = document.getElementById('novo-adc-nome');
    const precoInput = document.getElementById('novo-adc-preco'). replace(",",".");

    const nome = nomeInput.value.trim();
    const preco = precoInput.value.replace(",",".");

    // Validação simples
    if (nome === "" || isNaN(preco)) {
        alert("Por favor, preencha o nome e o preço corretamente.");
        return;
    }

    // Adiciona ao objeto original
    const novoItem = {
        nome: nome.toLowerCase(),
        preco: preco
    };

    produtoCombo.embalagens[0].adicionais.push(novoItem);

    // Limpa os campos
    nomeInput.value = "";
    precoInput.value = "";

    // Atualiza a visualização da tabela
    renderizarPagina();
}
lucide.createIcons()

