import {z} from 'zod';

export const quizFormSchema = z.object({

    context: z.string().min(4, {message: "Context must be atleast 150 characters long.",}).max(1000, {message: "Context must be atmost 1000 characters long.",}),
    //ye to topic k liye ho gaya
    //ab question kis type ka hoga

    type : z.enum(['mcq', 'fib']),

    //ab question honge kitne

    count: z.number().min(1).max(10),
    
});

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string(),
});
