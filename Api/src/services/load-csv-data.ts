import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync";
import { createMoviesTable, insertMovie } from "../repositories";

/**
 * Service responsável pelo carregamento e processamento dos dados CSV
 * Lê o arquivo movielist.csv, processa os dados e insere no banco de dados SQLite
 */

/**
 * Carrega e processa os dados do arquivo CSV para o banco de dados
 * 
 * Esta função realiza o seguinte processo:
 * 1. Cria a tabela de filmes no banco de dados
 * 2. Lê o arquivo CSV movielist.csv
 * 3. Faz o parsing dos dados CSV usando delimitador ";"
 * 4. Processa cada linha do CSV:
 *    - Identifica se o filme é vencedor
 *    - Separa os produtores (pode haver múltiplos por filme)
 *    - Insere cada produtor individualmente no banco
 * 5. Trata erros de leitura e processamento
 * 
 * @returns Promise<void> - Função assíncrona que não retorna valor
 */
const loadCsvData = async (): Promise<void> => {
  // Cria a tabela de filmes no banco de dados SQLite
  await createMoviesTable();

  // Define o caminho para o arquivo CSV na pasta data
  const csvFilePath = path.join(__dirname, "..", "..", "data", "movielist.csv");

  try {
    // Lê o conteúdo do arquivo CSV como string UTF-8
    const fileContent = await fs.readFile(csvFilePath, "utf-8");

    // Faz o parsing do CSV com as seguintes configurações:
    // - columns: true - Usa a primeira linha como cabeçalho
    // - skip_empty_lines: true - Ignora linhas vazias
    // - delimiter: ";" - Usa ponto e vírgula como separador
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ";",
    });

    // Processa cada linha do CSV
    for (const row of records) {
      // Verifica se o filme é vencedor (campo "winner" com valor "yes")
      const isWinner = row.winner?.toLowerCase() === "yes";

      // Separa os produtores usando vírgula ou " and " como separador
      // e remove espaços em branco de cada produtor
      const producers = row.producers
        .split(/,|\sand\s/)
        .map((producer: string) => producer.trim());

      // Insere cada produtor individualmente no banco de dados
      // Isso permite que um filme tenha múltiplos produtores
      for (const producer of producers) {
        insertMovie(
          Number(row.year),        // Ano do filme
          row.title,               // Título do filme
          row.studios,             // Estúdio(s)
          producer,                // Nome do produtor
          isWinner ? 1 : 0         // Flag de vencedor (1 = sim, 0 = não)
        );
      }
    }
  } catch (error) {
    // Log do erro e re-throw para tratamento superior
    console.error("Error loading CSV data:", error);
    throw error;
  }
};

export default loadCsvData;
