
    async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginSenha').value;
    const btn = document.getElementById('btnLogin');

    btn.innerText = "AUTENTICANDO...";
    btn.disabled = true;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // Erro comum: "Invalid login credentials"
        alert("Erro ao entrar: " + error.message);
        btn.innerText = "ENTRAR NO CARDÁPIO";
        btn.disabled = false;
    } else {
        // Sucesso! O Supabase já guarda a sessão no localStorage automaticamente
        console.log('Login realizado com sucesso:', data.user);
        window.location.href = 'cardapio.html';
    }
}
async function handleSignUp(event) {
    event.preventDefault();

    const email = document.getElementById('cadEmail').value;
    const password = document.getElementById('cadSenha').value;
    const nome = document.getElementById('cadNome').value;
    const btn = document.getElementById('btnCadastrar');

    btn.innerText = "CRIANDO CONTA...";
    btn.disabled = true;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: nome // Salva o nome dentro do objeto user_metadata
            }
        }
    });

    if (error) {
        alert("Erro no cadastro: " + error.message);
        btn.innerText = "CRIAR MINHA CONTA";
        btn.disabled = false;
    } else {
        // Se o Supabase estiver configurado para confirmar e-mail:
        alert("Sucesso! Verifique seu e-mail para confirmar o cadastro.");
        
        // Se a confirmação de e-mail estiver DESATIVADA, ele já loga:
        if (data.session) {
            window.location.href = 'cardapio.html';
        }
    }
}