import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function alterData() {
  await prisma.$executeRaw`DELETE FROM "Category" WHERE id = 5;`;
}
alterData();

export async function GET(req) {
  let categories = await prisma.category.findMany();
  return Response.json(categories);
}
export async function POST(req) {
  const body = await req.json();
  try {
    let category = await prisma.category.create({
      data: body,
    });
    return Response.json({
      success: true,
      category,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}
