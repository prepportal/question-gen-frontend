"use client";

import React from "react";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { quizFormSchema } from "@/schemas/form/quiz";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getWikiSummary } from "@/lib/wiki";

import LoadingQuestions from "../LoadingQuestions";
import { Bot, Zap } from "lucide-react";

type Props = {};

type Input = z.infer<typeof quizFormSchema>;

const QuizCreation = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q_type = searchParams.get("type") as "mcq" | "fib" | "truefalse";

  const topic = searchParams.get("topic") || "";
  if (topic) {
    const summary = getWikiSummary(topic);
  }

  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);

  const { mutate: getQuestions, isLoading } = useMutation({
    //2:18
    mutationFn: async ({ context, count, type, model }: Input) => {
      const response = await axios.post("/api/game", {
        context,
        count,
        type,
        model,
      });

      return response.data;
    },
  });

  const form = useForm<Input>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      context: "",
      count: 3,
      type: "mcq",
      model: "prepportal",
    },
  });
  const { setValue } = form;

  useQuery(["wikiSummary", topic], () => getWikiSummary(topic), {
    enabled: !!topic,
    onSuccess: (summary) => {
      setValue("context", summary);
    },
  });

  function onSubmit(input: Input) {
    // alert(JSON.stringify(input ,null ,2))           //isse mast json format me print ho kr aa rha object with all inputs in the middle of the screen

    setShowLoader(true);

    getQuestions(
      {
        context: input.context,
        count: input.count,
        type: q_type,
        model: input.model,
      },
      {
        onSuccess: ({ gameId }) => {
          setFinishedLoading(true); //ending the loading screen and then now I am moving this whole function inside timeout so that the loading screen stays for 1 sec and then the questions appear
          setTimeout(() => {
            if (q_type == "fib") {
              router.push(`/play/fib/${gameId}`);
            } else if (q_type == "mcq") {
              router.push(`/play/mcq/${gameId}`);
            } else if (q_type == "truefalse") {
              router.push(`/play/truefalse/${gameId}`);
            }
          }, 1000);
        },
        onError: () => {
          setShowLoader(false);
        },
      }
    );
  }

  form.watch();

  if (showLoader) {
    return <LoadingQuestions finished={finishedLoading} />;
  }

  return (
    // <div className=' flex items-center justify-center my-[9%] overflow-y-hidden mx-auto sm:w-4/5 md:w-3/5 lg:w-full'>
    <div className=" absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className=" shadow-lg w-[370px] lg:w-[600px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {q_type == "mcq"
              ? "Multiple Choice"
              : q_type == "truefalse"
              ? "True/False"
              : "Fill in the Blanks"}{" "}
            Creation
          </CardTitle>
          <CardDescription>Create Quiz from the given Context</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a context parahgraph..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>Please provide a context.</FormDescription>
                    <FormMessage />{" "}
                    {/*ye show krega wo formSchema wala error message ki topic should be atleast 4 characters long */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an amount..."
                        {...field}
                        type="number"
                        min={1}
                        max={10}
                        onChange={(e) => {
                          form.setValue("count", parseInt(e.target.value));
                          {
                            /*isse ho ye raha ki ek to sirf integers hi input me daal skte aur 1 se 10 k beech me nhi to error dega 
                                        aur ye form.setValue kr paa rahe kyunki form variable is coming from react-hook-form so it provides us with a lot of utility function       //1:34 */
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      You can choose how many questions you would like to be
                      quizzed on here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  variant={
                    form.getValues("model") === "prepportal"
                      ? "default"
                      : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-l-lg"
                  onClick={() => {
                    form.setValue("model", "prepportal");
                  }}
                  type="button"
                >
                  <Zap className="w-4 h-4 mr-2" /> Prepportal
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={
                    form.getValues("model") === "gpt" ? "default" : "secondary"
                  }
                  className="w-1/2 rounded-none rounded-r-lg"
                  onClick={() => form.setValue("model", "gpt")}
                  type="button"
                >
                  <Bot className="w-4 h-4 mr-2" /> ChatGPT
                </Button>
              </div>

              <Separator />

              <Button disabled={isLoading} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCreation;
