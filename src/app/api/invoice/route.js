import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req) {
  let invoice = await prisma.invoice.findMany();
  return Response.json(invoice);
}
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
export async function POST(req) {
  const body = await req.json();
  try {
    let invoice = await prisma.invoice.create({
      data: body,
    });
    return Response.json({
      success: true,
      invoice,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error,
    });
  }
}
