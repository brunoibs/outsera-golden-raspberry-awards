import db from "../db/connection";

export const createMoviesTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      db.exec(
        `CREATE TABLE IF NOT EXISTS movies (
          year INTEGER,
          title TEXT,
          studios TEXT,
          producers TEXT,
          winner INTEGER
        )`
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export const insertMovie = (
  year: number,
  title: string,
  studios: string,
  producers: string,
  winner: number
): void => {
  try {
    const insert = db.prepare(
      "INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)"
    );
    insert.run(year, title, studios, producers, winner);
  } catch (err) {
    console.error("Error inserting movie:", err);
  }
};
