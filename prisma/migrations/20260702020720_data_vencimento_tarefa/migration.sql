/*
  Warnings:

  - Added the required column `data_vencimento` to the `tarefa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tarefa" ADD COLUMN     "data_vencimento" DATE NOT NULL;
