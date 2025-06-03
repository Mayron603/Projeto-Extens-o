function animateCounter(elementId, target, duration = 2000) {
            const element = document.getElementById(elementId);
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
        
        // Initialize counters when page loads
        window.addEventListener('load', () => {
            animateCounter('vacancies-counter', 1000);
            animateCounter('companies-counter', 1000);
            animateCounter('candidates-counter', 1000);
        });
