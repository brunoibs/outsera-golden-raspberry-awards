export interface AwardInterval {
  producers: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface AwardIntervalsResponse {
  min: AwardInterval[];
  max: AwardInterval[];
}
