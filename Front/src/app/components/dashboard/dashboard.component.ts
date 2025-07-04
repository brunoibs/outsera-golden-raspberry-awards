import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { 
  YearWithMultipleWinners, 
  StudioCountPerWin, 
  ProducerWithInterval, 
  MovieResponse 
} from '../../models/movie.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <h1 class="page-title">Dashboard - Golden Raspberry Awards</h1>
      
      <div class="dashboard-grid">
        <!-- Painel 1: Anos com Múltiplos Vencedores -->
        <div class="dashboard-card">
          <div class="card-header">
            <h2 class="card-title">Anos com Múltiplos Vencedores</h2>
          </div>
          <div class="card-content">
            <div class="table-container" *ngIf="yearsWithMultipleWinners.length > 0; else loadingYears">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Quantidade de Vencedores</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let yearData of yearsWithMultipleWinners">
                    <td>{{ yearData.year }}</td>
                    <td>{{ yearData.winnerCount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #loadingYears>
              <div class="loading">Carregando dados dos anos...</div>
            </ng-template>
          </div>
        </div>

        <!-- Painel 2: Top 3 Estúdios -->
        <div class="dashboard-card">
          <div class="card-header">
            <h2 class="card-title">Top 3 Estúdios com Mais Vitórias</h2>
          </div>
          <div class="card-content">
            <div class="table-container" *ngIf="topStudios.length > 0; else loadingStudios">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Estúdio</th>
                    <th>Vitórias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let studio of topStudios.slice(0, 3)">
                    <td>{{ studio.name }}</td>
                    <td>{{ studio.winCount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #loadingStudios>
              <div class="loading">Carregando dados dos estúdios...</div>
            </ng-template>
          </div>
        </div>

        <!-- Painel 3: Produtores com Maior Intervalo -->
        <div class="dashboard-card">
          <div class="card-header">
            <h2 class="card-title">Maior Intervalo Entre Vitórias</h2>
          </div>
          <div class="card-content">
            <div class="table-container" *ngIf="maxIntervalProducers.length > 0; else loadingMaxInterval">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Produtor</th>
                    <th>Intervalo</th>
                    <th>Período</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let producer of maxIntervalProducers">
                    <td>{{ producer.producer }}</td>
                    <td>{{ producer.interval }} anos</td>
                    <td>{{ producer.previousWin }} → {{ producer.followingWin }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #loadingMaxInterval>
              <div class="loading">Carregando intervalos máximos...</div>
            </ng-template>
          </div>
        </div>

        <!-- Painel 4: Produtores com Menor Intervalo -->
        <div class="dashboard-card">
          <div class="card-header">
            <h2 class="card-title">Menor Intervalo Entre Vitórias</h2>
          </div>
          <div class="card-content">
            <div class="table-container" *ngIf="minIntervalProducers.length > 0; else loadingMinInterval">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Produtor</th>
                    <th>Intervalo</th>
                    <th>Período</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let producer of minIntervalProducers">
                    <td>{{ producer.producer }}</td>
                    <td>{{ producer.interval }} anos</td>
                    <td>{{ producer.previousWin }} → {{ producer.followingWin }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #loadingMinInterval>
              <div class="loading">Carregando intervalos mínimos...</div>
            </ng-template>
          </div>
        </div>
      </div>

      <!-- Seção de Busca por Ano -->
      <div class="search-section">
        <h2 class="search-title">Buscar Vencedores por Ano</h2>
        <div class="search-form">
          <div class="search-group">
            <label for="yearSearch">Ano:</label>
            <input 
              type="number" 
              id="yearSearch" 
              [(ngModel)]="searchYear" 
              placeholder="Digite o ano (ex: 2020)"
              min="1980"
              max="2024"
            >
          </div>
          <button class="search-btn" (click)="searchWinnersByYear()">
            Buscar
          </button>
        </div>

        <!-- Resultados da Busca -->
        <div class="search-results" *ngIf="winnersByYear.length > 0">
          <h3 class="results-title">Vencedores de {{ searchYear }}</h3>
          <div class="winners-grid">
            <div class="winner-card" *ngFor="let movie of winnersByYear">
              <h4 class="movie-title">{{ movie.title }}</h4>
              <div class="movie-details">
                <p><strong>Estúdios:</strong> {{ movie.studios.join(', ') }}</p>
                <p><strong>Produtores:</strong> {{ movie.producers.join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="no-results" *ngIf="showNoResults">
          <p>Nenhum vencedor encontrado para o ano {{ searchYear }}.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
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

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .dashboard-card {
      background: rgba(52, 73, 94, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 107, 53, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .dashboard-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      border-color: rgba(255, 107, 53, 0.4);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .card-icon {
      font-size: 1.5rem;
      color: var(--primary-orange);
    }

    .card-title {
      color: var(--white);
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
    }

    .card-content {
      color: var(--lighter-gray);
      font-size: 0.9rem;
      line-height: 1.6;
    }

    .stats-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .stats-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 107, 53, 0.1);
    }

    .stats-item:last-child {
      border-bottom: none;
    }

    .stats-label {
      color: var(--lighter-gray);
      font-size: 0.9rem;
    }

    .stats-value {
      color: var(--primary-orange);
      font-weight: 600;
      font-size: 1rem;
    }

    .winner-badge {
      background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    /* Seção de Busca */
    .search-section {
      background: rgba(52, 73, 94, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 2rem;
      border: 1px solid rgba(255, 107, 53, 0.2);
      margin-bottom: 2rem;
    }

    .search-title {
      color: var(--white);
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      text-align: center;
    }

    .search-form {
      display: flex;
      gap: 1rem;
      align-items: end;
      justify-content: center;
      flex-wrap: wrap;
    }

    .search-group {
      display: flex;
      width: 200px;
      flex-direction: column;
      gap: 0.5rem;
    }

    .search-group label {
      color: var(--white);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .search-input {
      background: rgba(44, 62, 80, 0.8);
      border: 1px solid var(--light-gray);
      border-radius: 6px;
      padding: 0.75rem;
      color: var(--white);
      font-size: 0.9rem;
      width: 200px;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-orange);
      box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
    }

    .search-btn {
      background: var(--primary-orange);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .search-btn:hover {
      background: var(--primary-orange-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    }

    .search-btn:disabled {
      background: var(--light-gray);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    /* Resultados da Busca */
    .search-results {
      margin-top: 1.5rem;
    }

    .results-title {
      color: var(--white);
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .results-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .result-item {
      background: rgba(44, 62, 80, 0.6);
      border: 1px solid rgba(255, 107, 53, 0.1);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    }

    .result-item:hover {
      background: rgba(44, 62, 80, 0.8);
      border-color: rgba(255, 107, 53, 0.3);
    }

    .result-title {
      color: var(--white);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .result-details {
      color: var(--lighter-gray);
      font-size: 0.9rem;
    }

    .no-results {
      color: var(--lighter-gray);
      text-align: center;
      font-style: italic;
      padding: 1rem;
    }

    .loading {
      color: var(--primary-orange);
      text-align: center;
      padding: 1rem;
    }

    /* Responsividade */
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .search-form {
        flex-direction: column;
        align-items: stretch;
      }

      .search-input {
        min-width: auto;
      }

      .page-title {
        font-size: 2rem;
      }

      .dashboard-card {
        padding: 1rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = [];
  topStudios: StudioCountPerWin[] = [];
  maxIntervalProducers: ProducerWithInterval[] = [];
  minIntervalProducers: ProducerWithInterval[] = [];
  winnersByYear: MovieResponse[] = [];
  searchYear: number | null = null;
  showNoResults = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Carregar anos com múltiplos vencedores
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: (response) => {
        this.yearsWithMultipleWinners = response.years;
      },
      error: (error) => {
        console.error('Erro ao carregar anos com múltiplos vencedores:', error);
      }
    });

    // Carregar estúdios com contagem de vitórias
    this.movieService.getStudiosWithWinCount().subscribe({
      next: (response) => {
        this.topStudios = response.studios;
      },
      error: (error) => {
        console.error('Erro ao carregar estúdios:', error);
      }
    });

    // Carregar intervalos de produtores
    this.movieService.getMaxMinWinIntervalForProducers().subscribe({
      next: (response) => {
        this.maxIntervalProducers = response.max;
        this.minIntervalProducers = response.min;
      },
      error: (error) => {
        console.error('Erro ao carregar intervalos de produtores:', error);
      }
    });
  }

  searchWinnersByYear(): void {
    if (!this.searchYear) {
      return;
    }

    this.movieService.getWinnersByYear(this.searchYear).subscribe({
      next: (winners) => {
        this.winnersByYear = winners;
        this.showNoResults = winners.length === 0;
      },
      error: (error) => {
        console.error('Erro ao buscar vencedores por ano:', error);
        this.winnersByYear = [];
        this.showNoResults = true;
      }
    });
  }
} 