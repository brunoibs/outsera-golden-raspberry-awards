import db from "../db/connection";

/**
 * Repository responsável pelas operações de banco de dados relacionadas aos prêmios
 * Contém queries SQL para buscar informações sobre vitórias consecutivas dos produtores
 */

/**
 * Busca todos os prêmios dos produtores com informações sobre vitórias consecutivas
 * 
 * Esta função executa uma query SQL complexa que:
 * 1. Seleciona apenas filmes vencedores (winner = 1)
 * 2. Usa a função de janela LEAD() para encontrar a próxima vitória de cada produtor
 * 3. Ordena por produtor e ano para garantir sequência correta
 * 4. Retorna uma lista com:
 *    - producers: nome do produtor
 *    - previousWin: ano da vitória atual
 *    - followingWin: ano da próxima vitória (pode ser null se não houver próxima vitória)
 * 
 * A função LEAD() é uma função de janela que permite acessar dados de linhas subsequentes
 * sem usar self-join, tornando a query mais eficiente.
 * 
 * @returns Promise<any[]> - Array de objetos com informações dos prêmios dos produtores
 */
export const fetchProducerAwards = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      // Query SQL que usa função de janela LEAD() para encontrar vitórias consecutivas
      const rows = db.prepare(
        `SELECT producers, year as previousWin, LEAD(year) OVER (PARTITION BY producers ORDER BY year) AS followingWin
         FROM movies
         WHERE winner = 1
         ORDER BY producers, year`
      ).all();
      resolve(rows);
    } catch (err) {
      reject(err);
    }
  });
};
