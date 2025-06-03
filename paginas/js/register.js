document.addEventListener('DOMContentLoaded', function() {
    // Mostrar campos específicos para empresas
    const userTypeSelect = document.getElementById('user_type');
    const companyFields = document.getElementById('companyFields');
    
    if (userTypeSelect && companyFields) {
        userTypeSelect.addEventListener('change', function() {
            if (this.value === 'company') {
                companyFields.classList.remove('d-none');
                // Tornar campos obrigatórios
                document.querySelectorAll('#companyFields [required]').forEach(el => {
                    el.required = true;
                });
            } else {
                companyFields.classList.add('d-none');
                // Remover obrigatoriedade
                document.querySelectorAll('#companyFields [required]').forEach(el => {
                    el.required = false;
                });
            }
        });
    }

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

    // Validação do formulário de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const password = this.querySelector('#password').value;
            const confirmPassword = this.querySelector('#confirm_password').value;
            
            // Verificar se as senhas coincidem
            if (password !== confirmPassword) {
                e.preventDefault();
                alert('As senhas não coincidem!');
                return;
            }
            
            // Verificar força da senha
            if (password.length < 8) {
                e.preventDefault();
                alert('A senha deve ter pelo menos 8 caracteres!');
                return;
            }
            
            // Verificar termos aceitos
            if (!this.querySelector('#terms').checked) {
                e.preventDefault();
                alert('Você deve aceitar os termos e condições!');
                return;
            }
        });
    }
});