import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request) {
  return new Response("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const cat = searchParams.get("cat");

  let products = await prisma.product.findMany(
    cat
      ? {
          where: {
            categoryId: parseInt(cat),
          },
        }
      : {}
  );

  return Response.json(products);
}

export async function POST(req) {
  const body = await req.json();
  try {
    let product = await prisma.product.create({
      data: body,
    });
    return Response.json({
      success: true,
      product,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}
