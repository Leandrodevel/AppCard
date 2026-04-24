// Supondo que a URL seja: meusite.com?nome=Alex
const urlParams = new URLSearchParams(window.location.search);
const idcomercio = urlParams.get('id_comercio') || 'lpcardapios';

 let idComercio  
 let nomeComercio  
 let logoComercio 
 let temaComercio 

async function renderizaComercio() {
  try {
    const dados = await getComercios()
    
    idComercio = dados.id
    nomeComercio = dados.nome
    logoComercio = dado.logo
    temaComercio = dados.tema

  } catch (e) {
    //window.location.replace('home.html');
  }
}
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
    window.onload = () => {
    trocarTema('tema-amarelo-claro');
};