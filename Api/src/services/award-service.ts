import { AwardInterval, AwardIntervalsResponse } from "../types";
import { fetchProducerAwards } from "../repositories/award-repository";

/**
 * Service responsável pela lógica de negócio relacionada aos prêmios dos produtores
 * Calcula os intervalos entre vitórias consecutivas e identifica os produtores
 * com menor e maior intervalo entre prêmios
 */

/**
 * Obtém os intervalos de prêmios dos produtores
 * 
 * Esta função implementa a lógica de negócio principal:
 * 1. Busca todos os prêmios dos produtores no banco de dados
 * 2. Filtra apenas registros que têm vitórias consecutivas (followingWin)
 * 3. Calcula o intervalo entre cada vitória consecutiva
 * 4. Identifica o menor e maior intervalo
 * 5. Retorna os produtores com menor e maior intervalo
 * 
 * @returns Promise<AwardIntervalsResponse> - Objeto contendo arrays de produtores com menor e maior intervalo
 */
const getProducerIntervals = async (): Promise<AwardIntervalsResponse> => {
  // Busca todos os prêmios dos produtores no repositório
  const rows = await fetchProducerAwards();
  
  // Filtra apenas registros com vitórias consecutivas e mapeia para o formato desejado
  const intervals: AwardInterval[] = rows
    .filter((row: any) => row.followingWin) // Remove registros sem vitória consecutiva
    .map((row: any) => ({
      producers: row.producers,
      interval: row.followingWin - row.previousWin, // Calcula o intervalo entre vitórias
      previousWin: row.previousWin,
      followingWin: row.followingWin,
    }));

  // Encontra o menor e maior intervalo entre todos os produtores
  const minInterval = Math.min(...intervals.map((i) => i.interval));
  const maxInterval = Math.max(...intervals.map((i) => i.interval));

  // Retorna os produtores com menor e maior intervalo
  return {
    min: intervals.filter((i) => i.interval === minInterval), // Produtores com menor intervalo
    max: intervals.filter((i) => i.interval === maxInterval), // Produtores com maior intervalo
  };
};

export default getProducerIntervals;
