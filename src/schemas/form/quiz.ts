import {z} from 'zod';

export const quizFormSchema = z.object({
    topic: z.string().min(5, {message: "Topic must be atleast 5 characters long.",}),
    context: z.string().min(150, {message: "Context must be atleast 150 characters long.",}),
    //ye to topic k liye ho gaya
    //ab question kis type ka hoga

    type : z.enum(['mcq', 'fib', 'truefalse']),

    //ab question honge kitne

    count: z.number().min(1).max(10),
    
});

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string(),
});
