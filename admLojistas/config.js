 // Inicializar ícones do Lucide
       
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

function registraLogista(event) {
  // Impede o formulário de atualizar a página
  event.preventDefault();

  const dadosLogista = {
    nome: document.getElementById('adm_nome').value,
    email: document.getElementById('adm_email').value,
    telefone: document.getElementById('adm_telefone').value,
    plano: document.getElementById('adm_plano').value
  };

  const senha = document.getElementById('adm_senha').value;
  const confirmaSenha = document.getElementById('adm_senha_confirma').value;

  if (senha !== confirmaSenha) {
    alert('As senhas não coincidem!');
    return; 
  }

  // Salva e redireciona
  salvarNoCache(dadosLogista);
  window.location.href = 'cadastroLoja.html';
}


  // Aqui você importaria o seu supabase client
        // import { supabase } from './configSupabase.js';

        const form = document.getElementById('formCadastroLoja');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
          
            const dadosLoja = {
                nome_comercio: document.getElementById('nome_comercio').value,
                slug: document.getElementById('slug').value.toLowerCase().trim(),
                whatsapp: document.getElementById('whatsapp').value,
                tema_comercio: document.querySelector('input[name="tema_comercio"]:checked').value,
                endereco_completo: document.getElementById('endereco_completo').value,
                cidade: document.getElementById('cidade').value,
                instagram_url: document.getElementById('instagram_url').value,
                facebook_url: document.getElementById('facebook_url').value,
                // Aqui você pode definir um horário padrão para evitar que o campo comece nulo
                horarios_funcionamento: pegarHorarios() 
            };

          

            console.log("Enviando dados:", dadosLoja);
            alert('Dados prontos para enviar! Agora é só conectar com o supabase.insert()');
             salvarNoCache(dadosLoja);
            /* Exemplo de envio:
            const { error } = await supabase.from('lojas').insert([dadosLoja]);
            if (!error) window.location.href = `Home.html?comercio=${dadosLoja.slug}`;
            */
        });

function pegarHorarios() {
    const dias = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
    const dadosFuncionamento = {};

    dias.forEach(dia => {
        const aberto = document.querySelector(`input[name="${dia}_aberto"]`).checked;
        const entrada = document.querySelector(`input[name="${dia}_ini"]`).value;
        const saida = document.querySelector(`input[name="${dia}_fim"]`).value;

        dadosFuncionamento[dia] = {
            aberto: aberto,
            horario: aberto ? `${entrada} às ${saida}` : "Fechado",
            entrada: entrada,
            saida: saida
        };
    });

    console.log(dadosFuncionamento);
    return dadosFuncionamento;
}

// Exemplo de uso: Chame essa função no clique do botão de salvar
// const meusDados = pegarHorarios();
function irPara(url) {
    event.preventDefault();
  // 1. Salva os dados da tela atual antes de sair
  
  // 2. Agora sim, muda de página
  window.location.href = url;
}
