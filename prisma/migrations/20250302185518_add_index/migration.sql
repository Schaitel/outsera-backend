-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "studios" TEXT NOT NULL,
    "producers" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Movie" ("id", "producers", "studios", "title", "winner", "year") SELECT "id", "producers", "studios", "title", "winner", "year" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE INDEX "Movie_winner_idx" ON "Movie"("winner");
CREATE UNIQUE INDEX "Movie_title_year_key" ON "Movie"("title", "year");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
