document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simular envio do formulário
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
                    
                    // Simular tempo de processamento
                    setTimeout(function() {
                        submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Mensagem Enviada!';
                        
                        // Reset após 3 segundos
                        setTimeout(function() {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                            contactForm.reset();
                            
                            // Mostrar alerta de sucesso
                            alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
                        }, 3000);
                    }, 1500);
                });
            }
        });
