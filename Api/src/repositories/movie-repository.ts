import db from "../db/connection";

/**
 * Repository responsável pelas operações de banco de dados relacionadas aos filmes
 * Contém funções para criar a tabela de filmes e inserir dados do CSV
 */

/**
 * Cria a tabela de filmes no banco de dados SQLite
 * 
 * Esta função cria a estrutura da tabela 'movies' com os seguintes campos:
 * - year: ano de lançamento do filme (INTEGER)
 * - title: título do filme (TEXT)
 * - studios: estúdio(s) responsável(is) (TEXT)
 * - producers: nome do produtor (TEXT)
 * - winner: flag indicando se o filme venceu (INTEGER: 1 = sim, 0 = não)
 * 
 * A tabela é criada apenas se não existir (CREATE TABLE IF NOT EXISTS),
 * evitando erros em execuções subsequentes.
 * 
 * @returns Promise<void> - Promise que resolve quando a tabela é criada
 */
export const createMoviesTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Cria a tabela movies se ela não existir
      db.exec(
        `CREATE TABLE IF NOT EXISTS movies (
          year INTEGER,
          title TEXT,
          studios TEXT,
          producers TEXT,
          winner INTEGER
        )`
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Insere um filme na tabela movies
 * 
 * Esta função insere um registro de filme no banco de dados com os dados
 * processados do arquivo CSV. Cada produtor de um filme é inserido como
 * um registro separado, permitindo que um filme tenha múltiplos produtores.
 * 
 * @param year - Ano de lançamento do filme
 * @param title - Título do filme
 * @param studios - Estúdio(s) responsável(is) pelo filme
 * @param producers - Nome do produtor (um por registro)
 * @param winner - Flag indicando se o filme venceu (1 = sim, 0 = não)
 * @returns void - Função não retorna valor
 */
export const insertMovie = (
  year: number,
  title: string,
  studios: string,
  producers: string,
  winner: number
): void => {
  try {
    // Prepara a query de inserção com placeholders para evitar SQL injection
    const insert = db.prepare(
      "INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)"
    );
    // Executa a inserção com os parâmetros fornecidos
    insert.run(year, title, studios, producers, winner);
  } catch (err) {
    // Log do erro mas não interrompe o processo de carregamento
    console.error("Error inserting movie:", err);
  }
};
