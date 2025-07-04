import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  MovieResponse, 
  PageMovieResponse, 
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse,
  MaxMinWinIntervalForProducersResponse,
  MovieFilters
} from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // Em desenvolvimento, usa o proxy configurado
  // Em produção, usa a URL completa
  private apiUrl = '/api/movies';

  constructor(private http: HttpClient) { }

  // Dashboard endpoints
  getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinnersResponse> {
    return this.http.get<YearsWithMultipleWinnersResponse>(`${this.apiUrl}/yearsWithMultipleWinners`);
  }

  getStudiosWithWinCount(): Observable<StudiosWithWinCountResponse> {
    return this.http.get<StudiosWithWinCountResponse>(`${this.apiUrl}/studiosWithWinCount`);
  }

  getMaxMinWinIntervalForProducers(): Observable<MaxMinWinIntervalForProducersResponse> {
    return this.http.get<MaxMinWinIntervalForProducersResponse>(`${this.apiUrl}/maxMinWinIntervalForProducers`);
  }

  getWinnersByYear(year: number): Observable<MovieResponse[]> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<MovieResponse[]>(`${this.apiUrl}/winnersByYear`, { params });
  }

  // Movie list endpoints
  getMovies(filters: MovieFilters): Observable<PageMovieResponse> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('size', filters.size.toString());

    if (filters.winner !== undefined) {
      params = params.set('winner', filters.winner.toString());
    }

    if (filters.year !== undefined) {
      params = params.set('year', filters.year.toString());
    }

    return this.http.get<PageMovieResponse>(this.apiUrl, { params });
  }

  // Helper methods
  getTopStudios(limit: number = 3): Observable<StudiosWithWinCountResponse> {
    return this.http.get<StudiosWithWinCountResponse>(`${this.apiUrl}/studiosWithWinCount`);
  }
} 