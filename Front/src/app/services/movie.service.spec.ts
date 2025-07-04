import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { 
  MovieResponse, 
  PageMovieResponse, 
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  MaxMinWinIntervalForProducersResponse,
  MovieFilters
} from '../models/movie.model';

/**
 * Testes unitários para o MovieService
 * Este arquivo testa todas as funcionalidades do serviço responsável pelas chamadas HTTP da aplicação
 */
describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  // Dados mock para simular uma resposta de filme da API
  const mockMovieResponse: MovieResponse = {
    id: 1,
    year: 2020,
    title: 'Test Movie',
    studios: ['Test Studio'],
    producers: ['Test Producer'],
    winner: true
  };

  // Dados mock para simular uma resposta paginada da API
  const mockPageResponse: PageMovieResponse = {
    totalPages: 1,
    totalElements: 1,
    pageable: {
      pageNumber: 0,
      paged: true,
      pageSize: 10,
      unpaged: false,
      offset: 0,
      sort: { sorted: false, unsorted: true, empty: true }
    },
    numberOfElements: 1,
    size: 10,
    content: [mockMovieResponse],
    number: 0,
    sort: { sorted: false, unsorted: true, empty: true },
    first: true,
    last: true,
    empty: false
  };

  // Dados mock para simular resposta de anos com múltiplos vencedores
  const mockYearsResponse: YearsWithMultipleWinnersResponse = {
    years: [
      { year: 2020, winnerCount: 2 },
      { year: 2021, winnerCount: 3 }
    ]
  };

  // Dados mock para simular resposta de estúdios com contagem de vitórias
  const mockStudiosResponse: StudiosWithWinCountResponse = {
    studios: [
      { name: 'Studio A', winCount: 5 },
      { name: 'Studio B', winCount: 3 }
    ]
  };

  // Dados mock para simular resposta de intervalos de produtores
  const mockIntervalResponse: MaxMinWinIntervalForProducersResponse = {
    min: [
      {
        producer: 'Producer A',
        interval: 1,
        previousWin: 2020,
        followingWin: 2021
      }
    ],
    max: [
      {
        producer: 'Producer B',
        interval: 10,
        previousWin: 2010,
        followingWin: 2020
      }
    ]
  };

  /**
   * Configuração inicial executada antes de cada teste
   * Configura o ambiente de teste Angular e injeta as dependências necessárias
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  /**
   * Limpeza executada após cada teste
   * Verifica se todas as requisições HTTP foram tratadas
   */
  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Grupo de testes para o método getYearsWithMultipleWinners
   * Testa a busca de anos que tiveram múltiplos vencedores do Golden Raspberry Awards
   */
  describe('getYearsWithMultipleWinners', () => {
    /**
     * Teste de sucesso: verifica se o método retorna corretamente os anos com múltiplos vencedores
     * Simula uma chamada HTTP GET bem-sucedida e verifica se os dados retornados estão corretos
     */
    it('should return years with multiple winners', () => {
      service.getYearsWithMultipleWinners().subscribe(response => {
        expect(response).toEqual(mockYearsResponse);
      });

      const req = httpMock.expectOne('/api/movies/yearsWithMultipleWinners');
      expect(req.request.method).toBe('GET');
      req.flush(mockYearsResponse);
    });

    /**
     * Teste de erro: verifica se o método trata corretamente erros 500 (Internal Server Error)
     * Simula um erro 500 e verifica se o erro é propagado corretamente
     */
    it('should handle error when getting years with multiple winners', () => {
      service.getYearsWithMultipleWinners().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain('Http failure response');
        }
      });

      const req = httpMock.expectOne('/api/movies/yearsWithMultipleWinners');
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  /**
   * Grupo de testes para o método getStudiosWithWinCount
   * Testa a busca de estúdios com suas respectivas contagens de vitórias
   */
  describe('getStudiosWithWinCount', () => {
    /**
     * Teste de sucesso: verifica se o método retorna corretamente os estúdios com contagem de vitórias
     * Simula uma chamada HTTP GET bem-sucedida e verifica se os dados retornados estão corretos
     */
    it('should return studios with win count', () => {
      service.getStudiosWithWinCount().subscribe(response => {
        expect(response).toEqual(mockStudiosResponse);
      });

      const req = httpMock.expectOne('/api/movies/studiosWithWinCount');
      expect(req.request.method).toBe('GET');
      req.flush(mockStudiosResponse);
    });

    /**
     * Teste de erro: verifica se o método trata corretamente erros 404 (Not Found)
     * Simula um erro 404 e verifica se o erro é propagado corretamente
     */
    it('should handle error when getting studios with win count', () => {
      service.getStudiosWithWinCount().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.message).toContain('Http failure response');
        }
      });

      const req = httpMock.expectOne('/api/movies/studiosWithWinCount');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  /**
   * Grupo de testes para o método getMaxMinWinIntervalForProducers
   * Testa a busca de produtores com maior e menor intervalo entre vitórias
   */
  describe('getMaxMinWinIntervalForProducers', () => {
    /**
     * Teste de sucesso: verifica se o método retorna corretamente os intervalos de produtores
     * Simula uma chamada HTTP GET bem-sucedida e verifica se os dados retornados estão corretos
     */
    it('should return max and min win intervals for producers', () => {
      service.getMaxMinWinIntervalForProducers().subscribe(response => {
        expect(response).toEqual(mockIntervalResponse);
      });

      const req = httpMock.expectOne('/api/movies/maxMinWinIntervalForProducers');
      expect(req.request.method).toBe('GET');
      req.flush(mockIntervalResponse);
    });

    /**
     * Teste de erro: verifica se o método trata corretamente erros 400 (Bad Request)
     * Simula um erro 400 e verifica se o erro é propagado corretamente
     */
    it('should handle error when getting intervals', () => {
      service.getMaxMinWinIntervalForProducers().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(400);
          expect(error.message).toContain('Http failure response');
        }
      });

      const req = httpMock.expectOne('/api/movies/maxMinWinIntervalForProducers');
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  /**
   * Grupo de testes para o método getWinnersByYear
   * Testa a busca de vencedores por ano específico
   */
  describe('getWinnersByYear', () => {
    /**
     * Teste de sucesso: verifica se o método retorna corretamente os vencedores de um ano específico
     * Simula uma chamada HTTP GET com parâmetro de query e verifica se os dados retornados estão corretos
     */
    it('should return winners by year', () => {
      const year = 2020;
      const mockWinners = [mockMovieResponse];

      service.getWinnersByYear(year).subscribe(response => {
        expect(response).toEqual(mockWinners);
      });

      const req = httpMock.expectOne(`/api/movies/winnersByYear?year=${year}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockWinners);
    });

    /**
     * Teste de erro: verifica se o método trata corretamente erros ao buscar vencedores por ano
     * Simula um erro 500 e verifica se o erro é propagado corretamente
     */
    it('should handle error when getting winners by year', () => {
      const year = 2020;
      
      service.getWinnersByYear(year).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.message).toContain('Http failure response');
        }
      });

      const req = httpMock.expectOne(`/api/movies/winnersByYear?year=${year}`);
      req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

}); 