async function carregarCardapioPublico() {
    try {
        // 1. Pega o slug da URL (ex: ?loja=pastelzao-do-lp)
        const urlParams = new URLSearchParams(window.location.search);
        const slugDaUrl = urlParams.get('loja') || urlParams.get('comercio') || 'homepage';
     
        if (!slugDaUrl) {
            console.error("Nenhuma loja informada na URL.");
               window.location.href = "./admLojistas/homePage.html"; // Redireciona para a homepage padrão
            return;
        }

        // 2. Busca direta na tabela 'lojas' pelo slug
        const { data: loja, error } = await _supabase
            .from('lojas')
            .select('*')
            .eq('slug', slugDaUrl)
            .single();

        if (error) {
            console.error("Loja não encontrada:", error.message);
            // Opcional: Redirecionar para uma página 404
               window.location.href = "./admLojistas/homePage.html"; // Redireciona para a homepage padrão
            return;
        }
        if (loja) {
    const nomeDaLoja = loja.nome_comercio; // Ex: "Budega do LP"
    verificarStatusLoja(loja.horarios_funcionamento);
    // Pega a primeira letra
    const primeiraLetra = nomeDaLoja.charAt(0).toUpperCase();

    // Injeta no HTML
    const elementoLetra = document.getElementById('letraLogo');
    elementoLetra.innerText = primeiraLetra;

    // Atualiza o link para onde a logo deve levar
    document.getElementById('linkLogo').href = `home.html?loja=${loja.slug}`;

    // Armazena o número em um atributo personalizado no botão de finalizar
    const btnFinalizar = document.getElementById('btnFinalizarPedido');
    
    if (btnFinalizar) {
        btnFinalizar.setAttribute('data-whatsapp', loja.whatsapp);
    }

}
// Dentro do carregarCardapioPublico()
if (loja) {
    const btnShare = document.getElementById('btnCompartilhar');
    if (btnShare) {
        // Passa o objeto 'loja' completo para a função
        btnShare.onclick = () => compartilharDados(loja);
    }
}
        // 3. Aplica o tema visual salvo no banco
        if (loja.tema_comercio) {
            trocarTema(loja.tema_comercio);
        }

        // 4. Manda os dados para a tela
        exibirNaTela(loja);
        exibirHorariosResumidos(loja.horarios_funcionamento);

    } catch (error) {
        console.error("Erro inesperado:", error);
    }
    // Dentro da sua função carregarCardapioPublico, após receber os dados da 'loja'

}

function exibirNaTela(loja) {

    // Dados Simples
    document.getElementById('nomeLoja').innerText = loja.nome_comercio;
    document.getElementById('enderecoLoja').innerText = `${loja.endereco_completo}, ${loja.cidade}`;
     document.getElementById('telefoneLoja').innerText = loja.whatsapp;
    // Exibir WhatsApp com link
    const btnWhats = document.getElementById('linkWhats');
    btnWhats.href = `[https://wa.me/55$](https://wa.me/55$){loja.whatsapp}`;
}
function exibirHorariosResumidos(horarios) {
    const pHorarios = document.getElementById('textoHorarios');
    
    // Pegamos os horários base (segunda-feira)
    const seg = horarios.seg;
    const sab = horarios.sab;
    const dom = horarios.dom;

    let textoFinal = "";

    // Agrupamento de Segunda a Sexta
    if (seg && seg.aberto) {
        textoFinal += `Segunda a Sexta: <span class="font-bold text-gray-700">${seg.horario}</span>`;
    } else {
        textoFinal += `Segunda a Sexta: <span class="text-red-400">Fechado</span>`;
    }

    // Adiciona Sábado se existir
    if (sab && sab.aberto) {
        textoFinal += ` • Sáb: <span class="font-bold text-gray-700">${sab.horario}</span>`;
    }

    // Adiciona Domingo se existir
    if (dom && dom.aberto) {
        textoFinal += ` • Dom: <span class="font-bold text-gray-700">${dom.horario}</span>`;
    }

    pHorarios.innerHTML = textoFinal;
}
   
const compartilharDados = async (loja) => {
  // Pega o domínio atual para montar o link (ex: seusite.com/nome-da-loja)
  const linkAtual = window.location.href;

  const dadosCompartilhamento = {
    title: `Cardápio - ${loja.nome_comercio}`,
    text: `Confira o cardápio de ${loja.nome_comercio} no LP. Cardápios! 📋`,
    url: linkAtual
  };

  try {
    if (navigator.share) {
      await navigator.share(dadosCompartilhamento);
      console.log('Conteúdo compartilhado com sucesso!');
    } else {
      // Fallback: Tenta copiar o link para o clipboard se o navigator.share falhar
      await navigator.clipboard.writeText(linkAtual);
      alert('Link copiado para a área de transferência! Agora é só colar para compartilhar.');
    }
  } catch (err) {
    // Evita logar erro se o usuário apenas cancelou o compartilhamento
    if (err.name !== 'AbortError') {
      console.error('Erro ao compartilhar:', err);
    }
  }
};
function verificarStatusLoja(horarios) {
    const statusDaLoja = document.getElementById('statusOnline');
    const agora = new Date();
    
    // Pegar dia da semana (0 = domingo, 1 = segunda, etc.)
    const diasSemana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const diaAtual = diasSemana[agora.getDay()];
    
    // Pegar horas e minutos atuais
    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();
    const tempoAtualEmMinutos = (horaAtual * 60) + minutoAtual;

    const infoHoje = horarios[diaAtual];

    let abertoAgora = false;

    if (infoHoje && infoHoje.aberto) {
        // infoHoje.horario costuma ser "09:00 às 21:00"
        // Vamos extrair os números:
        const partes = infoHoje.horario.split(' às ');
        const [horaInicio, minInicio] = partes[0].split(':').map(Number);
        const [horaFim, minFim] = partes[1].split(':').map(Number);

        const tempoInicio = (horaInicio * 60) + minInicio;
        const tempoFim = (horaFim * 60) + minFim;

        if (tempoAtualEmMinutos >= tempoInicio && tempoAtualEmMinutos < tempoFim) {
            abertoAgora = true;
        }
    }

    // Renderização
    if (abertoAgora) {
        statusDaLoja.innerHTML = `
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></span>
            <span class="text-green-500 text-[10px] font-bold uppercase">Aberto agora</span>
        `;
    } else {
        statusDaLoja.innerHTML = `
            <span class="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
            <span class="text-red-500 text-[10px] font-bold uppercase">Fechado agora</span>
        `;
    }
}

// Para usar, basta chamar dentro da sua função carregarCardapioPublico:
// verificarStatusLoja(loja.horarios_funcionamento);





// Chame esta função dentro do seu carregarCardapioPublico:
// exibirHorariosResumidos(loja.horarios_funcionamento);
// document.getElementById('enderecoLoja').innerText = loja.endereco_completo;
//
function trocarTema(nomeDoTema) {
    // Seleciona o corpo da página
    const body = document.body;
    // Lista de todos os seus temas para limpeza
    const temas = [
        'tema-amarelo-branco', 'tema-amarelo-preto',
        'tema-laranja-branco', 'tema-laranja-preto',
        'tema-vermelho-branco', 'tema-vermelho-preto',
        'tema-verde-branco', 'tema-verde-preto',
        'tema-azul-branco', 'tema-azul-preto',
        'tema-acai-branco', 'tema-acai-preto'
    ];

    // Remove qualquer tema aplicado anteriormente
    temas.forEach(tema => body.classList.remove(tema));

    // Adiciona o novo tema escolhido
    body.classList.add(nomeDoTema);

    // Opcional: Salva a preferência do usuário no navegador
}
 async function enviarWhatsApp(whatsapp) {
    const userdados = await userDados();
    let somaAdicionais = [];

    if (userdados.rua === '' || userdados.bairro === '' || userdados.casa === '') {
        navegacao('enderecoTemp');
        return;
    }

    const meioDePagamento = document.querySelector('input[name="pay_method"]:checked');
    if (!meioDePagamento) {
        alert("Por favor, selecione uma forma de pagamento.");
        return;
    }

    const modal = document.getElementById('modalProcessando');
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
        const obsCarrinho = document.getElementById('obsCarrinho').value;
        const endereco = `${userdados.rua}, ${userdados.casa} - ${userdados.bairro}`;
        const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const numeroPedido = Date.now().toString().slice(-6);

        let mensagem = `☝️ *PEDIDO CONFIRMADO*\n\n`;
        mensagem += `👤 *Cliente:* ${userdados.nome}\n`;
        mensagem += `🔢 *Nº do Pedido:* ${numeroPedido}\n`;
        mensagem += `--------------------------------\n\n`;
        mensagem += `📦 *ITENS:*\n\n`;

        meuCarrinho.forEach(item => {
            mensagem += `➡️ *${item.qtd}x ${item.nome.toUpperCase()}*\n`;
            mensagem += `Subtotal: ${formatarMoeda(item.preco * item.qtd)}\n`;

            if (item.acompanhamentos) {
                mensagem += `  └ Obs: ${item.acompanhamentos}\n`;
            }

            if (item.adicionais && item.adicionais.length > 0) {
                let valorExtras = item.adicionais.reduce((acc, n) => acc + n.preco, 0);
                somaAdicionais.push(valorExtras * item.qtd); // Multiplica pela qtd do item
                let textoAdicionais = item.adicionais.map(n => n.nome).join(", ");
                mensagem += `  └ *Extras:* (${textoAdicionais})\n`;
            }

            if (item.observacao) {
                mensagem += `  └ *Nota:* ${item.observacao}\n`;
            }
            mensagem += `\n`;
        });

        if (obsCarrinho) {
            mensagem += `❕ *OBSERVAÇÕES DO PEDIDO:*\n${obsCarrinho}\n\n`;
        }

        mensagem += `--------------------------------\n`;
        mensagem += `🏠 *ENTREGA:* ${endereco}\n\n`;

        const totalProdutos = meuCarrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
        const totalAdicionais = somaAdicionais.reduce((acc, item) => acc + item, 0);
        const totalGeral = totalProdutos + totalAdicionais;

        mensagem += `💰 *TOTAL: ${formatarMoeda(totalGeral)}*\n`;
        mensagem += `💳 *PAGAMENTO:* ${meioDePagamento.value}\n`;

        if (meioDePagamento.value === 'DINHEIRO') {
            const campoTroco = document.getElementById('inputTroco');
            const valorTroco = campoTroco ? parseFloat(campoTroco.value) : 0;
            if (valorTroco > 0) {
                mensagem += `💵 *Troco para:* ${formatarMoeda(valorTroco)}\n`;
            }
        }

        /* Salvar Histórico e Limpar */
        const hoje = new Date();
        const dataHora = hoje.toLocaleString('pt-BR');
        const historico = JSON.parse(localStorage.getItem('meuHistorico')) || [];
        
        historico.push({
            numero: numeroPedido,
            pedido: [...meuCarrinho],
            total: totalGeral,
            data: dataHora
        });

        localStorage.setItem('meuHistorico', JSON.stringify(historico));
        
        // Limpeza Total
        meuCarrinho = [];
        localStorage.setItem('carrinho', JSON.stringify([]));
        atualizaContador();

        // Envio
        const numeroLimpo = whatsapp.replace(/\D/g, '');
        const url = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(url, '_blank');

        // Finalização da Página
        setTimeout(() => {
            modal.classList.add('hidden');
            window.location.href = 'index.html'; // Redireciona para a home limpa
        }, 1500);

    }, 1000);
}
    
    // Inicia a carga assim que a página abrir
window.addEventListener('DOMContentLoaded', carregarCardapioPublico);

