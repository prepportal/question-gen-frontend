
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/next-auth";
import { quizFormSchema } from "@/schemas/form/quiz";
import axios from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    // const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { count, context, type } = quizFormSchema.parse(body);
    let questions: any;
    if (type === "fib") {
      const response = await axios.post(`${process.env.BACKEND_URL as string}/generate`, {
            count: count,
            text: context,
            type: type,
        });
        questions = response.data;
    } else if (type === "mcq") {
        const response = await axios.post(`${process.env.BACKEND_URL as string}/generate`, {
            count: count,
            text: context,
            type: type,
        });

        questions = response.data;
            
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}