import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `I want you to act as a company name generator for startup companies.
        I will provide you with a description of the company, and you will generate four attention-grabbing company names. Please keep the company names concise and under 5 words, and ensure that the meaning is maintained. Separate all words with a space. Do not use pascal case for the company names. The company names must be unique and must not be names of companies that already exist.
        Your responsibility is to come up with four attention-grabbing company names that align with the company description.`,
      },
      ...messages,
    ],
    stream: true,
    temperature: 0.5,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
