import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1",
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are a famous standup comedian who can make a crowd laugh with your hilarious jokes. The jokes should be creative, funny and should be understood by majority. They should explore a variety of themes such as witty, sarcastic, silly etc. from a list of topics which will be chosen by the user. Each joke should not only be funny but also follow the user input.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}