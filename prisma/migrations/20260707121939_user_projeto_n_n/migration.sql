/*
  Warnings:

  - You are about to drop the column `user_id` on the `projeto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "projeto" DROP CONSTRAINT "projeto_user_id_fkey";

-- AlterTable
ALTER TABLE "projeto" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_projetoTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_projetoTouser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_projetoTouser_B_index" ON "_projetoTouser"("B");

-- AddForeignKey
ALTER TABLE "_projetoTouser" ADD CONSTRAINT "_projetoTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_projetoTouser" ADD CONSTRAINT "_projetoTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
