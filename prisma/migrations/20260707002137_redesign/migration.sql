/*
  Warnings:

  - You are about to drop the `_tagsTotarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lista_tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarefa` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PrioridadeAtividade" AS ENUM ('URGENTE', 'ALTA', 'MEDIA', 'BAIXA');

-- DropForeignKey
ALTER TABLE "_tagsTotarefa" DROP CONSTRAINT "_tagsTotarefa_A_fkey";

-- DropForeignKey
ALTER TABLE "_tagsTotarefa" DROP CONSTRAINT "_tagsTotarefa_B_fkey";

-- DropForeignKey
ALTER TABLE "lista_tarefa" DROP CONSTRAINT "lista_tarefa_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_lista_id_fkey";

-- DropTable
DROP TABLE "_tagsTotarefa";

-- DropTable
DROP TABLE "lista_tarefa";

-- DropTable
DROP TABLE "tarefa";

-- DropEnum
DROP TYPE "PrioridadeTarefa";

-- CreateTable
CREATE TABLE "atividade" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "realizada" BOOLEAN NOT NULL,
    "prioridade" "PrioridadeAtividade" NOT NULL,
    "data_vencimento" DATE NOT NULL,
    "projeto_id" INTEGER NOT NULL,

    CONSTRAINT "atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projeto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_atividadeTotags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_atividadeTotags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_atividadeTotags_B_index" ON "_atividadeTotags"("B");

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_projeto_id_fkey" FOREIGN KEY ("projeto_id") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_atividadeTotags" ADD CONSTRAINT "_atividadeTotags_A_fkey" FOREIGN KEY ("A") REFERENCES "atividade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_atividadeTotags" ADD CONSTRAINT "_atividadeTotags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
