-- CreateTable
CREATE TABLE "occupations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "occupations_person" (
    "person_id" TEXT NOT NULL,
    "occupation_id" TEXT NOT NULL,

    PRIMARY KEY ("person_id", "occupation_id"),
    CONSTRAINT "occupations_person_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "occupations_person_occupation_id_fkey" FOREIGN KEY ("occupation_id") REFERENCES "occupations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "occupations_name_key" ON "occupations"("name");
