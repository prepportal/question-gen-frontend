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
    const { count, context, type, model } = quizFormSchema.parse(body);
    let questions: any;
    let topic: any;
    if (type === "fib" && model === "MMQG-T") {
      const response = await axios.post(
        `${process.env.BACKEND_URL as string}/generate`,
        {
          count: count,
          text: context,
          type: type,
          model: model
        }
      );
      questions = response.data.questions;
      topic = response.data.topic;
    } else if (type === "fib" && model === "gpt") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a fill in blank question from the given context and the answer should be in the question so it can be replaced with blank, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array",
        new Array(count).fill(
          `You are to generate a random hard fill in the blank questions from ${context}`
        ),
        {
          question: "question",
          answer: "answer with max length of 15 words",
          topic: "Generate a topic based on the context provided"
        }
      );
      topic = questions[0].topic;
    } else if (type === "mcq" && model === "MMQG-T") {
      const response = await axios.post(
        `${process.env.BACKEND_URL as string}/generate`,
        {
          count: count,
          text: context,
          type: type,
        }
      );

      questions = response.data.questions;
      topic = response.data.topic;
    } else if (type === "mcq" && model === "gpt") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array",
        new Array(count).fill(
          `You are to generate a random hard mcq question about ${context}`
        ),
        {
          "question": "question",
          "answer": "answer with max length of 15 words",
          "option1": "option1 with max length of 15 words",
          "option2": "option2 with max length of 15 words",
          "option3": "option3 with max length of 15 words",
          "topic": "Generate a topic based on the context provided"
        }
      );
      topic = questions[0].topic;
    } else if (type === "truefalse" && model === "MMQG-T") {
      const response = await axios.post(
        `${process.env.BACKEND_URL as string}/generate`,
        {
          count: count,
          text: context,
          type: type,
        }
      );
      questions = response.data.questions;
      topic = response.data.topic;
    } else if (type === "truefalse" && model === "gpt") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate true false questions and answers, the length of each answer should not be more than 15 words, store all answers and questions in a JSON array",
        new Array(count).fill(
          `You are to generate a random hard true false question from ${context}`
        ),
        {
          "question": "question",
          "answer": "answer with max length of 15 words",
          "option1": "option1 with max length of 15 words",
          "topic": "Generate a topic based on the context provided"
        }
      );
      topic = questions[0].topic;
    }
    return NextResponse.json(
      {
        questions: questions,
        topic: topic,
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
      console.error(error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
