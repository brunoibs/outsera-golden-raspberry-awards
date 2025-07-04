import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MovieResponse, PageMovieResponse, MovieFilters } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="movie-list-container">
      <h1 class="page-title">Lista de Filmes - Golden Raspberry Awards</h1>
      
      <!-- Seção de Filtros -->
      <section class="filters-section">
        <div class="filters-container">
          <div class="filter-group">
            <label for="yearFilter">Ano:</label>
            <input 
              type="number" 
              id="yearFilter" 
              [(ngModel)]="filters.year" 
              (change)="onYearFilterChange()"
              placeholder="Filtrar por ano"
              min="1980"
              max="2024"
            >
          </div>

          <div class="filter-group">
            <label for="winnerFilter">Status:</label>
            <select id="winnerFilter" [(ngModel)]="winnerFilter" (change)="onWinnerFilterChange()">
              <option value="">Todos</option>
              <option value="true">Vencedores</option>
              <option value="false">Indicados</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="pageSize">Itens por página:</label>
            <select id="pageSize" [(ngModel)]="pageSize" (change)="onPageSizeChange()">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <button class="clear-filters" (click)="clearFilters()">Limpar Filtros</button>
        </div>
      </section>

      <!-- Seção de Lista de Filmes -->
      <section class="movies-section">
        <div class="movies-header">
          <h2 class="section-title">Filmes</h2>
          <div class="pagination-info" *ngIf="pageResponse">
            <span>Página {{ pageResponse.number + 1 }} de {{ pageResponse.totalPages }}</span>
            <span>Total: {{ pageResponse.totalElements }} filmes</span>
          </div>
        </div>
        
        <div class="movies-table-container" *ngIf="pageResponse && pageResponse.content.length > 0; else noMovies">
          <table class="movies-table">
            <thead>
              <tr>
                <th>Ano</th>
                <th>Título</th>
                <th>Estúdios</th>
                <th>Produtores</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let movie of pageResponse.content">
                <td class="year-cell">{{ movie.year }}</td>
                <td class="title-cell">{{ movie.title }}</td>
                <td class="studios-cell">{{ movie.studios.join(', ') }}</td>
                <td class="producers-cell">{{ movie.producers.join(', ') }}</td>
                <td class="status-cell">
                  <span class="status-badge" [class.winner-badge]="movie.winner">
                    {{ movie.winner ? 'Vencedor' : 'Indicado' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <div class="pagination-container" *ngIf="pageResponse && pageResponse.totalPages > 1">
          <div class="pagination-controls">
            <button 
              class="pagination-btn" 
              [disabled]="pageResponse.first"
              (click)="goToPage(0)"
            >
              Primeira
            </button>
            
            <button 
              class="pagination-btn" 
              [disabled]="pageResponse.first"
              (click)="goToPage(pageResponse.number - 1)"
            >
              Anterior
            </button>
            
            <span class="page-info">
              Página {{ pageResponse.number + 1 }} de {{ pageResponse.totalPages }}
            </span>
            
            <button 
              class="pagination-btn" 
              [disabled]="pageResponse.last"
              (click)="goToPage(pageResponse.number + 1)"
            >
              Próxima
            </button>
            
            <button 
              class="pagination-btn" 
              [disabled]="pageResponse.last"
              (click)="goToPage(pageResponse.totalPages - 1)"
            >
              Última
            </button>
          </div>
        </div>

        <ng-template #noMovies>
          <div class="no-movies">
            <p>Nenhum filme encontrado com os filtros aplicados.</p>
          </div>
        </ng-template>

        <ng-template #loadingMovies>
          <div class="loading">Carregando filmes...</div>
        </ng-template>
      </section>
    </div>
  `,
  styles: [`
    .movie-list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 0;
    }

    .page-title {
      color: var(--white);
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 2rem;
      background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Seção de Filtros */
    .filters-section {
      margin-bottom: 2rem;
    }

    .filters-container {
      background: rgba(52, 73, 94, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: flex-end;
      flex-wrap: wrap;
      border: 1px solid rgba(255, 107, 53, 0.2);
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .filter-group label {
      color: var(--white);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .filter-group input,
    .filter-group select {
      background: rgba(44, 62, 80, 0.8);
      border: 1px solid var(--light-gray);
      border-radius: 6px;
      padding: 0.75rem;
      color: var(--white);
      font-size: 0.9rem;
      min-width: 150px;
      transition: all 0.3s ease;
    }

    .filter-group input:focus,
    .filter-group select:focus {
      outline: none;
      border-color: var(--primary-orange);
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }

    .filter-group input::placeholder {
      color: var(--lighter-gray);
    }

    .filter-group select option {
      background: var(--dark-gray);
      color: var(--white);
    }

    .clear-filters {
      background: var(--primary-orange);
      border: none;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .clear-filters:hover {
      background: var(--primary-orange-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    }

    /* Seção de Filmes */
    .movies-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .section-title {
      color: var(--white);
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
    }

    .pagination-info {
      color: var(--lighter-gray);
      font-size: 0.9rem;
      display: flex;
      gap: 1rem;
    }

    .movies-table-container {
      background: rgba(52, 73, 94, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 107, 53, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .movies-table {
      width: 100%;
      border-collapse: collapse;
    }

    .movies-table th,
    .movies-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid rgba(255, 107, 53, 0.1);
    }

    .movies-table th {
      background: var(--primary-orange);
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .movies-table td {
      color: var(--white);
      font-size: 0.9rem;
    }

    .movies-table tr:hover {
      background: rgba(255, 107, 53, 0.05);
    }

    .year-cell {
      width: 80px;
      text-align: center;
    }

    .title-cell {
      font-weight: 500;
      color: var(--white);
    }

    .studios-cell,
    .producers-cell {
      max-width: 200px;
      word-wrap: break-word;
      color: var(--lighter-gray);
    }

    .status-cell {
      text-align: center;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      background: rgba(44, 62, 80, 0.8);
      color: var(--lighter-gray);
    }

    .winner-badge {
      background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
      color: white;
      font-weight: 600;
    }

    /* Paginação */
    .pagination-container {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .pagination-btn {
      background: var(--primary-orange);
      border: none;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .pagination-btn:hover:not(:disabled) {
      background: var(--primary-orange-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    }

    .pagination-btn:disabled {
      background: var(--light-gray);
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .page-info {
      color: var(--lighter-gray);
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
    }

    .loading, .no-movies {
      text-align: center;
      color: var(--lighter-gray);
      padding: 2rem;
      font-size: 1.1rem;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .filters-container {
        flex-direction: column;
        align-items: stretch;
      }

      .movies-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .movies-table {
        font-size: 0.8rem;
      }

      .movies-table th,
      .movies-table td {
        padding: 0.5rem;
      }

      .studios-cell,
      .producers-cell {
        max-width: 120px;
      }

      .pagination-controls {
        flex-direction: column;
        gap: 0.5rem;
      }

      .page-title {
        font-size: 2rem;
      }
    }
  `]
})
export class MovieListComponent implements OnInit {
  pageResponse: PageMovieResponse | null = null;
  filters: MovieFilters = {
    page: 0,
    size: 10
  };
  winnerFilter: string = '';
  pageSize: number = 10;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    const filters: MovieFilters = {
      page: this.filters.page,
      size: this.pageSize
    };

    if (this.filters.year) {
      filters.year = this.filters.year;
    }

    if (this.winnerFilter !== '') {
      filters.winner = this.winnerFilter === 'true';
    }

    console.log('Carregando filmes com filtros:', filters);

    this.movieService.getMovies(filters).subscribe({
      next: (response) => {
        console.log('Filmes carregados:', response);
        this.pageResponse = response;
      },
      error: (error) => {
        console.error('Erro ao carregar filmes:', error);
      }
    });
  }

  onPageSizeChange(): void {
    this.filters.page = 0;
    this.loadMovies();
  }

  goToPage(page: number): void {
    this.filters.page = page;
    this.loadMovies();
  }

  clearFilters(): void {
    this.filters = {
      page: 0,
      size: this.pageSize
    };
    this.winnerFilter = '';
    this.loadMovies();
  }

  onYearFilterChange(): void {
    console.log('Filtro de ano alterado:', this.filters.year);
    this.filters.page = 0;
    this.loadMovies();
  }

  onWinnerFilterChange(): void {
    console.log('Filtro de vencedor alterado:', this.winnerFilter);
    this.filters.page = 0;
    this.loadMovies();
  }
} 