 // Inicializar ícones do Lucide
       
let memoria
// Função auxiliar para gerenciar o salvamento
function salvarNoCache(dados) {
 
}
// Adicione 'async' aqui para poder usar o 'await'
async function registraLogista(event) {
    event.preventDefault();

    const email = document.getElementById('adm_email').value;
    const senha = document.getElementById('adm_senha').value;
    const confirmaSenha = document.getElementById('adm_senha_confirma').value;

    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        // 1. Criar o usuário no Supabase Auth
        // Certifique-se que a variável de configuração é 'supabase' ou '_supabase'
        const { data: authData, error: authError } = await _supabase.auth.signUp({
            email: email,
            password: senha,
        });

        if (authError) throw authError;

        // 2. Organizar os dados (Corrigido: Adicionado vírgulas faltantes)
        const dadosLogista = {
            user_id: authData.user.id, // ID único gerado pelo Supabase
            nome: document.getElementById('adm_nome').value,
            email: email,
            telefone: document.getElementById('adm_telefone').value,
            plano: document.getElementById('adm_plano').value
        };

        // 3. Salvar no LocalStorage para levar ao próximo passo
        // Salvamos como um objeto simples (sem os colchetes []) para facilitar a mesclagem depois
        localStorage.setItem('cadastroLogista', JSON.stringify(dadosLogista));

        // 4. Redirecionar para o passo da Loja
        alert('Conta de acesso criada! Vamos configurar sua loja agora.');
        window.location.href = 'cadastroLoja.html';

    } catch (error) {
        alert("Erro no cadastro: " + error.message);
        console.error(error);
    }
}
  // Aqui você importaria o seu supabase client
        // import { supabase } from './configSupabase.js';

    
function registraLoja(event) {
    event.preventDefault();

    const dadosLoja = {
        nome_comercio: document.getElementById('nome_comercio').value,
        slug: document.getElementById('slug').value.toLowerCase().trim(),
        whatsapp: document.getElementById('whatsapp').value,
        tema_comercio: document.querySelector('input[name="tema_comercio"]:checked').value,
        endereco_completo: document.getElementById('endereco_completo').value,
        cidade: document.getElementById('cidade').value,
        instagram_url: document.getElementById('instagram_url').value,
        facebook_url: document.getElementById('facebook_url').value,
        horarios_funcionamento: pegarHorarios() 
    };

    console.log("Enviando dados:", dadosLoja);

   // 1. Pega o que já existe (se não existir, inicia um objeto vazio {})
    let memoria = JSON.parse(localStorage.getItem('cadastroLogista')) || {};

    // 2. MESCLA os dados: O que for novo entra, o que já existia e não mudou, permanece.
    // Se 'memoria' for um objeto, isso vai unir as propriedades
    const objetoAtualizado = { ...memoria, ...dadosLoja };

    // 3. Salva de volta o objeto único e atualizado
    localStorage.setItem('cadastroLogista', JSON.stringify(objetoAtualizado));

    console.log("Objeto atualizado na memória:", objetoAtualizado);

    alert('Dados da loja mesclados com sucesso!');

    enviarParaSupabase()
    // Exemplo de redirecionamento para a próxima fase (opcional)
    // window.location.href = 'Sucesso.html';
};

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
async function enviarParaSupabase() {
    // 1. Pega os dados brutos do LocalStorage
    const dadosMemoria = JSON.parse(localStorage.getItem('cadastroLogista'));

    if (!dadosMemoria) {
        alert("Nenhum dado encontrado no cache!");
        return;
    }

    // 2. Limpeza: Extraímos os dados do dono que estão na chave "0" 
    // para ficarem no mesmo nível do objeto (Flat)
    const dadosParaEnviar = {
        user_id: dadosMemoria.user_id,
        adm_nome: dadosMemoria.nome,
        adm_email: dadosMemoria.email,
        adm_telefone: dadosMemoria.telefone,
        adm_plano: dadosMemoria.plano,
        nome_comercio: dadosMemoria.nome_comercio,
        slug: dadosMemoria.slug,
        whatsapp: dadosMemoria.whatsapp,
        tema_comercio: dadosMemoria.tema_comercio,
        endereco_completo: dadosMemoria.endereco_completo,
        cidade: dadosMemoria.cidade,
        instagram_url: dadosMemoria.instagram_url,
        facebook_url: dadosMemoria.facebook_url,
        horarios_funcionamento: dadosMemoria.horarios_funcionamento // A coluna no banco deve ser JSONB
    };

    try {
        // 3. Executa o insert no Supabase
        // Certifique-se que a variável 'supabase' foi inicializada no seu config.js
        const { data, error } = await _supabase
            .from('lojas') 
            .insert([dadosParaEnviar])
            .select();

        if (error) throw error;

        console.log("Sucesso:", data);
        alert("Cadastro realizado com sucesso!");

        // Opcional: Limpar cache após sucesso
        // localStorage.removeItem('cadastroLogista');
        
        // Redirecionar
        // window.location.href = "dashboard.html";

    } catch (error) {
        console.error("Erro ao salvar:", error.message);
        alert("Erro ao salvar no banco de dados: " + error.message);
    }
}
// Exemplo de uso: Chame essa função no clique do botão de salvar
// const meusDados = pegarHorarios();
function irPara(url) {
    event.preventDefault();
  // 1. Salva os dados da tela atual antes de sair
  
  // 2. Agora sim, muda de página
  window.location.href = url;
}
