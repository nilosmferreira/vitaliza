-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "primeiroNome" TEXT NOT NULL,
    "ultimoNome" TEXT NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletadoEm" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nomeUsuario_key" ON "usuarios"("nomeUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
