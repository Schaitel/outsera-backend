-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "studios" TEXT NOT NULL,
    "producers" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL
);
