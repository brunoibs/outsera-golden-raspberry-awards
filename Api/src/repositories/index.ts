/**
 * Arquivo de exportação centralizada dos repositories
 * 
 * Este arquivo exporta todas as funções dos repositories para facilitar
 * a importação em outros módulos. Ao invés de importar de cada arquivo
 * separadamente, outros módulos podem importar tudo de uma vez:
 * 
 * import { createMoviesTable, insertMovie, fetchProducerAwards } from '../repositories';
 * 
 * Isso melhora a organização do código e facilita a manutenção.
 */

export * from "./award-repository";
export * from "./movie-repository";
