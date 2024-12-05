const API_URL = 'http://localhost:3000';

// Busca de textos da API.
// Lista de seções com os IDs correspondentes
const secoes = [
  { id: 'home', h1: '#home_h1', p: '#home_p' },
  { id: 'recreacao', h1: '#recreacao_h1', p: '#recreacao_p' },
  { id: 'aniversario_tematico', h1: '#aniversario_tematico_h1', p: '#aniversario_tematico_p' },
  { id: 'programacao_ferias', h1: '#programacao_ferias_h1', p: '#programacao_ferias_p' },
  { id: 'community_day', h1: '#community_day_h1', p: '#community_day_p' },
  { id: 'game_2030', h1: '#game_2030_h1', p: '#game_2030_p' },
  { id: 'kids_day', h1: '#kids_day_h1', p: '#kids_day_p' },
  { id: 'leilao_tematico', h1: '#leilao_tematico_h1', p: '#leilao_tematico_p' },
  { id: 'robotica', h1: '#robotica_h1', p: '#robotica_p' },
  { id: 'space_room', h1: '#space_room_h1', p: '#space_room_p' },
  { id: 'teatro', h1: '#teatro_h1', p: '#teatro_p' },
  { id: 'sipat', h1: '#sipat_h1', p: '#sipat_p' },
  { id: 'batalha_nerf', h1: '#batalha_nerf_h1', p: '#batalha_nerf_p' },
  { id: 'bolhas_gigantes', h1: '#bolhas_gigantes_h1', p: '#bolhas_gigantes_p' },
  { id: 'catavento', h1: '#catavento_h1', p: '#catavento_p' },
  { id: 'culinaria', h1: '#culinaria_h1', p: '#culinaria_p' },
  { id: 'pintura_tela', h1: '#pintura_tela_h1', p: '#pintura_tela_p' },
  { id: 'pulseira_macrame', h1: '#pulseira_macrame_h1', p: '#pulseira_macrame_p' },
  { id: 'slime', h1: '#slime_h1', p: '#slime_p' },
  { id: 'robotica2', h1: '#robotica2_h1', p: '#robotica2_p' },
  { id: 'terrario', h1: '#terrario_h1', p: '#terrario_p' },
  { id: 'clinicas_esportivas', h1: '#clinicas_esportivas_h1', p: '#clinicas_esportivas_p' },
  { id: 'estacao_fitness', h1: '#estacao_fitness_h1', p: '#estacao_fitness_p' }
];

const getTexto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/texts/${id}`);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return { h1: data.h1, p: data.p };
  } catch (error) {
    console.error(`Erro ao buscar texto para ${id}:`, error);
    throw error;
  }
};

function atualizarTexto(texto, h1Selector, pSelector) {
  const h1Elemento = document.querySelector(h1Selector);
  const pElemento = document.querySelector(pSelector);

  if (h1Elemento) h1Elemento.innerHTML = texto.h1 || 'Texto não encontrado';
  if (pElemento) pElemento.innerHTML = texto.p || 'Texto não encontrado';
}

async function atualizarTodasSecoes() {
  for (const secao of secoes) {
    try {
      const texto = await getTexto(secao.id);
      atualizarTexto(texto, secao.h1, secao.p);
    } catch (error) {
      console.error(`Erro ao atualizar texto da seção ${secao.id}:`, error);
    }
  }
}

// Chamada inicial para atualizar todas as seções
atualizarTodasSecoes();