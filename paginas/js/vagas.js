// Função para animar contadores
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

// Dados de exemplo das vagas
const vagas = [
    {
        id: 1,
        titulo: "Desenvolvedor Front-end Júnior",
        empresa: "Tech Solutions Ltda",
        local: "Muriaé - MG",
        tipo: "CLT",
        salario: 3200,
        descricao: "Busca-se desenvolvedor front-end júnior com conhecimentos em HTML, CSS e JavaScript básico.",
        data: "2023-07-15",
        area: "Tecnologia",
        experiencia: "Júnior"
    },
    {
        id: 2,
        titulo: "Assistente Administrativo",
        empresa: "Comércio Mineiro S/A",
        local: "Muriaé - MG",
        tipo: "CLT",
        salario: 1800,
        descricao: "Vaga para assistente administrativo com experiência em departamento pessoal.",
        data: "2023-07-10",
        area: "Administrativo",
        experiencia: "Pleno"
    },
    // Adicione mais vagas conforme necessário
];

// Função para renderizar as vagas
function renderVagas(vagasList) {
    const container = document.querySelector('.vagas-container');
    container.innerHTML = '';

    if (vagasList.length === 0) {
        container.innerHTML = `
            <div class="alert alert-info">
                Nenhuma vaga encontrada com os filtros selecionados.
            </div>
        `;
        return;
    }

    vagasList.forEach(vaga => {
        const dias = Math.floor((new Date() - new Date(vaga.data)) / (1000 * 60 * 60 * 24));
        
        container.innerHTML += `
            <div class="card mb-3 shadow-sm vaga-card" data-id="${vaga.id}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <h3 class="h5 fw-bold">${vaga.titulo}</h3>
                            <p class="text-muted mb-2">${vaga.empresa}</p>
                            <div class="d-flex flex-wrap gap-3 mb-3">
                                <span class="badge bg-light text-dark">
                                    <i class="fas fa-map-marker-alt me-1"></i> ${vaga.local}
                                </span>
                                <span class="badge bg-light text-dark">
                                    <i class="fas fa-briefcase me-1"></i> ${vaga.tipo}
                                </span>
                                <span class="badge bg-light text-dark">
                                    <i class="fas fa-money-bill-wave me-1"></i> R$ ${vaga.salario.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                            <p class="mb-0">${vaga.descricao}</p>
                        </div>
                        <div class="col-md-4 text-md-end mt-3 mt-md-0">
                            <button class="btn btn-outline-primary ver-detalhes">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    // Atualiza contador
    document.getElementById('vagas-count').textContent = vagasList.length;
}

// Função para filtrar vagas
function filtrarVagas() {
    const termoBusca = document.getElementById('input-busca').value.toLowerCase();
    const localizacao = document.getElementById('select-local').value;
    const tipoVaga = Array.from(document.querySelectorAll('input[name="tipo-vaga"]:checked')).map(el => el.value);
    const areaAtuacao = Array.from(document.querySelectorAll('input[name="area-atuacao"]:checked')).map(el => el.value);
    const experiencia = Array.from(document.querySelectorAll('input[name="experiencia"]:checked')).map(el => el.value);

    const vagasFiltradas = vagas.filter(vaga => {
        return (
            (vaga.titulo.toLowerCase().includes(termoBusca) || 
            vaga.empresa.toLowerCase().includes(termoBusca) ||
            vaga.descricao.toLowerCase().includes(termoBusca))
            && (localizacao === '' || vaga.local.includes(localizacao))
            && (tipoVaga.length === 0 || tipoVaga.includes(vaga.tipo))
            && (areaAtuacao.length === 0 || areaAtuacao.includes(vaga.area))
            && (experiencia.length === 0 || experiencia.includes(vaga.experiencia))
        );
    });

    renderVagas(vagasFiltradas);
}

// Função para limpar filtros
function limparFiltros() {
    document.getElementById('input-busca').value = '';
    document.getElementById('select-local').value = '';
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    filtrarVagas();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa com todas as vagas
    renderVagas(vagas);
    animateCounter('vagas-count', vagas.length);

    // Busca rápida
    document.getElementById('form-busca').addEventListener('submit', (e) => {
        e.preventDefault();
        filtrarVagas();
    });

    // Filtros
    document.querySelectorAll('.filtro-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', filtrarVagas);
    });

    // Botão limpar
    document.getElementById('btn-limpar').addEventListener('click', limparFiltros);

    // Ver detalhes
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('ver-detalhes')) {
            const card = e.target.closest('.vaga-card');
            const id = card.dataset.id;
            // Aqui você pode redirecionar para uma página de detalhes ou mostrar um modal
            alert(`Detalhes da vaga ID: ${id}`);
        }
    });
});