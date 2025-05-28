import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY, // Uses your .env file key
  dangerouslyAllowBrowser: true,
});

export default openai;
