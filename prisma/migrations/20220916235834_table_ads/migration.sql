-- CreateTable
CREATE TABLE "ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timePlaying" INTEGER NOT NULL,
    "disc" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "hourIn" INTEGER NOT NULL,
    "hourOut" INTEGER NOT NULL,
    "voice" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ad_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
