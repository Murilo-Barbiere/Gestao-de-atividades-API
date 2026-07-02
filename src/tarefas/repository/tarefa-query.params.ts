import { Prisma } from "generated/prisma/client";

export interface TarefaQueryParams {
    where: Prisma.tarefaWhereInput;
    orderBy?: Prisma.tarefaOrderByWithRelationInput;
}