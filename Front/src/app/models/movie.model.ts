export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: boolean;
}

export interface MovieResponse {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface PageMovieResponse {
  totalPages: number;
  totalElements: number;
  pageable: PageableObject;
  numberOfElements: number;
  size: number;
  content: MovieResponse[];
  number: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PageableObject {
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: SortObject;
}

export interface SortObject {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWithMultipleWinners[];
}

export interface StudioCountPerWin {
  name: string;
  winCount: number;
}

export interface StudiosWithWinCountResponse {
  studios: StudioCountPerWin[];
}

export interface ProducerWithInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface MaxMinWinIntervalForProducersResponse {
  min: ProducerWithInterval[];
  max: ProducerWithInterval[];
}

export interface ApiErrorResponse {
  status: string;
  timestamp: string;
  message: string;
}

// Interfaces para filtros e navegação
export interface MovieFilters {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}

export interface DashboardData {
  yearsWithMultipleWinners: YearWithMultipleWinners[];
  studiosWithWinCount: StudioCountPerWin[];
  maxMinWinInterval: MaxMinWinIntervalForProducersResponse;
  winnersByYear: MovieResponse[];
} 