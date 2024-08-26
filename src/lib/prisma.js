import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use a global variable to store the PrismaClient instance
const prisma = globalThis.prismaGlobal || prismaClientSingleton();

export default prisma;

// In development mode, store the instance in the global object to prevent reinitialization
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
