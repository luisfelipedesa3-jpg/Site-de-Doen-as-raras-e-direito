document.addEventListener('DOMContentLoaded', () => {
    const resultadosContainer = document.getElementById('resultados');
    const caixaBusca = document.getElementById('caixa-busca');
    const botaoBusca = document.getElementById('botao-busca');
    let baseDeConhecimento = [];

    // Carregar os dados do JSON
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ao carregar o data.json');
            }
            return response.json();
        })
        .then(data => {
            baseDeConhecimento = data;
            exibirResultados(baseDeConhecimento);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            resultadosContainer.innerHTML = '<p style="text-align: center; color: red;">Erro ao carregar as informações. Tente novamente mais tarde.</p>';
        });

    // Função para exibir os resultados
    function exibirResultados(resultados) {
        resultadosContainer.innerHTML = ''; // Limpa os resultados anteriores
        if (resultados.length === 0) {
            resultadosContainer.innerHTML = '<p style="text-align: center;">Nenhum resultado encontrado.</p>';
            return;
        }

        resultados.forEach(item => {
            const article = document.createElement('article');

            // O JavaScript irá gerar este HTML para cada item
            article.innerHTML = `
                <div class="card-imagem">
                    <img src="${item.imagem_url}" alt="Imagem sobre ${item.nome}">
                </div>
                <div class="card-conteudo">
                    <h2>${item.nome}</h2>
                    <p><strong>Tipo:</strong> ${item.tipo}</p>
                    <p>${item.descricao}</p>
                    <a href="${item.link_mais_info}" target="_blank" rel="noopener noreferrer">Saiba mais</a>
                </div>
            `;
            resultadosContainer.appendChild(article);
        });
    }

    // Função de busca
    function buscar() {
        const termoBusca = caixaBusca.value.toLowerCase().trim();
        const resultadosFiltrados = baseDeConhecimento.filter(item =>
            item.nome.toLowerCase().includes(termoBusca) ||
            item.descricao.toLowerCase().includes(termoBusca) ||
            item.tipo.toLowerCase().includes(termoBusca) ||
            item.tags.some(tag => tag.toLowerCase().includes(termoBusca))
        );
        exibirResultados(resultadosFiltrados);
    }

    botaoBusca.addEventListener('click', buscar);
    caixaBusca.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            buscar();
        }
    });
});