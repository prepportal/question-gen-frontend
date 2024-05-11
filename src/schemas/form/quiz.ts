import {z} from 'zod';

export const quizFormSchema = z.object({
    context: z.string().min(150, {message: "Context must be atleast 150 characters long.",}),
    //ye to topic k liye ho gaya
    //ab question kis type ka hoga
    model: z.enum(['MMQG-T', 'gpt']),

    type : z.enum(['mcq', 'fib', 'truefalse']),

    //ab question honge kitne

    count: z.number().min(1).max(10),
    
});

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string(),
});

export const endGameSchema = z.object({
    gameId: z.string(),
    timeEnded: z.string(),
});
