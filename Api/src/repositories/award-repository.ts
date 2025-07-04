import db from "../db/connection";

export const fetchProducerAwards = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    try {
      const rows = db.prepare(
        `SELECT producers, year as previousWin, LEAD(year) OVER (PARTITION BY producers ORDER BY year) AS followingWin
         FROM movies
         WHERE winner = 1
         ORDER BY producers, year`
      ).all();
      resolve(rows);
    } catch (err) {
      reject(err);
    }
  });
};
