document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/esconder senha
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.closest('.input-group').querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Validação básica do formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // Adicionar validações aqui
            // Exemplo: verificar se o email é válido
            const email = this.querySelector('#email').value;
            if (!email.includes('@')) {
                e.preventDefault();
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
});