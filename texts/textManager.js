const API_URL = 'http://localhost:3000';

const getTexto = async (id) => {
  try {
    const response = await fetch(`${API_URL}/texts/${id}`);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return {h1: data.h1, p: data.p};
  } catch (error) {
    console.error("Erro ao buscar texto: ", error);
    throw error;
  }
};

function atualizarTexto(texto, idTag) {
  const elementoTexto = document.querySelector(idTag);
  if (elementoTexto) {
    elementoTexto.innerHTML = texto;
  } else {
    console.warn("Elemento não encontrado!");
  }
}

// Home

async function AtualizarTextoHome() {
  try {
    const texto = await getTexto('home');
    atualizarTexto(texto.h1, '#home_h1');
    atualizarTexto(texto.p, '#home_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

// Sociais

async function AtualizarTextoRecreacao() {
  try {
    const texto = await getTexto('recreacao');
    atualizarTexto(texto.h1, '#recreacao_h1');
    atualizarTexto(texto.p, '#recreacao_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoAniversarioTematico() {
  try {
    const texto = await getTexto('aniversario_tematico');
    atualizarTexto(texto.h1, '#aniversario_tematico_h1');
    atualizarTexto(texto.p, '#aniversario_tematico_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoProgramacaoFerias() {
  try {
    const texto = await getTexto('programacao_ferias');
    atualizarTexto(texto.h1, '#programacao_ferias_h1');
    atualizarTexto(texto.p, '#programacao_ferias_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

// Corporativos

async function AtualizarTextoCommunityDay() {
  try {
    const texto = await getTexto('community_day');
    atualizarTexto(texto.h1, '#community_day_h1');
    atualizarTexto(texto.p, '#community_day_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoGame2030() {
  try {
    const texto = await getTexto('game_2030');
    atualizarTexto(texto.h1, '#game_2030_h1');
    atualizarTexto(texto.p, '#game_2030_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoKidsDay() {
  try {
    const texto = await getTexto('kids_day');
    atualizarTexto(texto.h1, '#kids_day_h1');
    atualizarTexto(texto.p, '#kids_day_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoLeilaoTematico() {
  try {
    const texto = await getTexto('leilao_tematico');
    atualizarTexto(texto.h1, '#leilao_tematico_h1');
    atualizarTexto(texto.p, '#leilao_tematico_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoRobotica() {
  try {
    const texto = await getTexto('robotica');
    atualizarTexto(texto.h1, '#robotica_h1');
    atualizarTexto(texto.p, '#robotica_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoSpaceRoom() {
  try {
    const texto = await getTexto('space_room');
    atualizarTexto(texto.h1, '#space_room_h1');
    atualizarTexto(texto.p, '#space_room_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoTeatro() {
  try {
    const texto = await getTexto('teatro');
    atualizarTexto(texto.h1, '#teatro_h1');
    atualizarTexto(texto.p, '#teatro_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoSipat() {
  try {
    const texto = await getTexto('sipat');
    atualizarTexto(texto.h1, '#sipat_h1');
    atualizarTexto(texto.p, '#sipat_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

// Oficinas

async function AtualizarTextoBatalhaNerf() {
  try {
    const texto = await getTexto('batalha_nerf');
    atualizarTexto(texto.h1, '#batalha_nerf_h1');
    atualizarTexto(texto.p, '#batalha_nerf_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoBolhasGigantes() {
  try {
    const texto = await getTexto('bolhas_gigantes');
    atualizarTexto(texto.h1, '#bolhas_gigantes_h1');
    atualizarTexto(texto.p, '#bolhas_gigantes_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoCatavento() {
  try {
    const texto = await getTexto('catavento');
    atualizarTexto(texto.h1, '#catavento_h1');
    atualizarTexto(texto.p, '#catavento_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoCulinaria() {
  try {
    const texto = await getTexto('culinaria');
    atualizarTexto(texto.h1, '#culinaria_h1');
    atualizarTexto(texto.p, '#culinaria_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoPinturaTela() {
  try {
    const texto = await getTexto('pintura_tela');
    atualizarTexto(texto.h1, '#pintura_tela_h1');
    atualizarTexto(texto.p, '#pintura_tela_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoPulseiraMacrame() {
  try {
    const texto = await getTexto('pulseira_macrame');
    atualizarTexto(texto.h1, '#pulseira_macrame_h1');
    atualizarTexto(texto.p, '#pulseira_macrame_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoSlime() {
  try {
    const texto = await getTexto('slime');
    atualizarTexto(texto.h1, '#slime_h1');
    atualizarTexto(texto.p, '#slime_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoRobotica2() {
  try {
    const texto = await getTexto('robotica2');
    atualizarTexto(texto.h1, '#robotica2_h1');
    atualizarTexto(texto.p, '#robotica2_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoTerrario() {
  try {
    const texto = await getTexto('terrario');
    atualizarTexto(texto.h1, '#terrario_h1');
    atualizarTexto(texto.p, '#terrario_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

// Saúde e Bem Estar

async function AtualizarTextoClinicasEsportivas() {
  try {
    const texto = await getTexto('clinicas_esportivas');
    atualizarTexto(texto.h1, '#clinicas_esportivas_h1');
    atualizarTexto(texto.p, '#clinicas_esportivas_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

async function AtualizarTextoEstacaoFitness() {
  try {
    const texto = await getTexto('estacao_fitness');
    atualizarTexto(texto.h1, '#estacao_fitness_h1');
    atualizarTexto(texto.p, '#estacao_fitness_p');
  } catch (error) {
    console.error("Erro ao atualizar o texto: ", error);
  }
}

// Chamando Funções

AtualizarTextoHome();
AtualizarTextoRecreacao();
AtualizarTextoAniversarioTematico();
AtualizarTextoProgramacaoFerias();
AtualizarTextoCommunityDay();
AtualizarTextoGame2030();
AtualizarTextoKidsDay();
AtualizarTextoLeilaoTematico();
AtualizarTextoRobotica();
AtualizarTextoSpaceRoom();
AtualizarTextoTeatro();
AtualizarTextoSipat();
AtualizarTextoBatalhaNerf();
AtualizarTextoBolhasGigantes();
AtualizarTextoCatavento();
AtualizarTextoCulinaria();
AtualizarTextoPinturaTela();
AtualizarTextoPulseiraMacrame();
AtualizarTextoSlime();
AtualizarTextoRobotica2();
AtualizarTextoTerrario();
AtualizarTextoClinicasEsportivas();
AtualizarTextoEstacaoFitness();