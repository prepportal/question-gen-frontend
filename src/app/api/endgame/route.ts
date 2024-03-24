import { endGameSchema } from "@/schemas/form/quiz";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { gameId, timeEnded } = endGameSchema.parse(body);

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return NextResponse.json(
        { error: "Game not found" },
        {
          status: 404,
        }
      );
    }

    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(timeEnded),
      },
    });
    return NextResponse.json("Success!", { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    }
  }
}
