-- CreateTable
CREATE TABLE "user_avatars" (
    "avatar" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("avatar", "user_id"),
    CONSTRAINT "user_avatars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
