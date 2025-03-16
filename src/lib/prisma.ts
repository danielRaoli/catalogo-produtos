import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function getAllProducts() {
    return await prisma.produto.findMany({
      include: {
        imagens: true
      }
    });
  }
    
  export default prisma;