-- AlterTable
ALTER TABLE "atividade" ADD COLUMN     "paiId" INTEGER;

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_paiId_fkey" FOREIGN KEY ("paiId") REFERENCES "atividade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
