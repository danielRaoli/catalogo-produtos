import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function getAllProducts() {
    return await prisma.produto.findMany();
  }
    
  export default prisma;