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
    trocarTema('tema-vermelho-escuro'); // Define o tema padrão ao carregar a página
};