const API_URL = 'http://localhost:3000';

const getTexto = async (id) => {
    try {
        const response = await fetch(`${API_URL}/texts/` + id);
        if (!response.ok) {
            throw new Error(`Erro ao buscar texto para ${id}: ${response.status}`);
        }
        const data = await response.json();
        return {
            h1: data.h1,
            p: data.p
        };
    } catch (error) {
        console.error("Erro ao buscar texto: ", error);
        throw error;
    }
};

const setTexto = async (id, h1, p) => {
    try {
        const response = await fetch(`${API_URL}/texts/` + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ h1, p })
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return {
            h1: data.h1,
            p: data.p
        };
    } catch (error) {
        console.error('Erro ao atualizar texto:', error);
        throw error;
    }
};

window.onload = async function () {
    const sections = [
        'home',
        'recreacao',
        'aniversario_tematico',
        'programacao_ferias',
        'community_day',
        'game_2030',
        'kids_day',
        'leilao_tematico',
        'robotica',
        'space_room',
        'teatro',
        'sipat',
        'batalha_nerf',
        'bolhas_gigantes',
        'catavento',
        'culinaria',
        'pintura_tela',
        'pulseira_macrame',
        'slime',
        'robotica2',
        'terrario',
        'clinicas_esportivas',
        'estacao_fitness'
    ];

    for (const section of sections) {
        try {
            const texto = await getTexto(section);
            const textoH1 = document.getElementById(`${section}_h1`);
            const textoP = document.getElementById(`${section}_p`);
            if (textoH1) textoH1.innerText = texto.h1;
            if (textoP) textoP.innerText = texto.p;
        } catch (error) {
            alert(`Não foi possível carregar o texto para a seção: ${section}`);
        }
    }
};

const sections = [
    'home',
    'recreacao',
    'aniversario_tematico',
    'programacao_ferias',
    'community_day',
    'game_2030',
    'kids_day',
    'leilao_tematico',
    'robotica',
    'space_room',
    'teatro',
    'sipat',
    'batalha_nerf',
    'bolhas_gigantes',
    'catavento',
    'culinaria',
    'pintura_tela',
    'pulseira_macrame',
    'slime',
    'robotica2',
    'terrario',
    'clinicas_esportivas',
    'estacao_fitness'
];

// Associar um manipulador de eventos para salvar cada seção
sections.forEach(section => {
    const button = document.getElementById(`saveText-${section}`); // Botão específico para cada seção
    if (button) {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const h1Element = document.getElementById(`${section}_h1`);
            const pElement = document.getElementById(`${section}_p`);

            if (!h1Element || !pElement) {
                console.warn(`Elementos da seção ${section} não encontrados.`);
                return;
            }

            const h1Value = h1Element.innerText.trim();
            const pValue = pElement.innerText.trim();

            if (!h1Value || !pValue) {
                alert(`Por favor, preencha ambos os campos.`);
                return;
            }

            try {
                await setTexto(section, h1Value, pValue);
                alert(`Texto salvo com sucesso!`);
            } catch (error) {
                alert(`Erro ao salvar o texto.`);
                console.error(error);
            }
        });
    } else {
        console.warn(`Botão para a seção ${section} não encontrado.`);
    }
});