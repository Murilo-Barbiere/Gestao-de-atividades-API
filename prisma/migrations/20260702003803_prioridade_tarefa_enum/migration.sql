/*
  Warnings:

  - Added the required column `prioridade` to the `tarefa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prioridade` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrioridadeTarefa" AS ENUM ('URGENTE', 'ALTA', 'MEDIA', 'BAIXA');

-- AlterTable
ALTER TABLE "tarefa" ADD COLUMN     "prioridade" "PrioridadeTarefa" NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "prioridade" "PrioridadeTarefa" NOT NULL;
