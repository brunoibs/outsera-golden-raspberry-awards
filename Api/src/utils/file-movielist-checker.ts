import fs from "fs";
import path from "path";

export const checkMovieListFileExists = async (): Promise<void> => {
  const filename = "movielist.csv";
  const filePath = path.join(__dirname, "..", "..", "data", filename);
  if (!fs.existsSync(filePath)) {
    console.error(
      `Error: The file ${filename} is missing in the data directory.`
    );
    process.exit(1);
  }
};
