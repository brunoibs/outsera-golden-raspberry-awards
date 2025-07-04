import app from "./app";
import loadCsvData from "./services/load-csv-data";
import { checkMovieListFileExists } from "./utils/file-movielist-checker";

const startServer = async (): Promise<void> => {
  await checkMovieListFileExists();
  await loadCsvData();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
