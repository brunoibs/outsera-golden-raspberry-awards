import { AwardInterval, AwardIntervalsResponse } from "../types";
import { fetchProducerAwards } from "../repositories/award-repository";

const getProducerIntervals = async (): Promise<AwardIntervalsResponse> => {
  const rows = await fetchProducerAwards();
  const intervals: AwardInterval[] = rows
    .filter((row: any) => row.followingWin)
    .map((row: any) => ({
      producers: row.producers,
      interval: row.followingWin - row.previousWin,
      previousWin: row.previousWin,
      followingWin: row.followingWin,
    }));

  const minInterval = Math.min(...intervals.map((i) => i.interval));
  const maxInterval = Math.max(...intervals.map((i) => i.interval));

  return {
    min: intervals.filter((i) => i.interval === minInterval),
    max: intervals.filter((i) => i.interval === maxInterval),
  };
};

export default getProducerIntervals;
