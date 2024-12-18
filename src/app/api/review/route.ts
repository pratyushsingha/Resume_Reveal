import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { groq } from "@/utils/groq";
import { reviewSchema } from "@/schemas/reviewSchema";
import { REVIEW_PROMPT } from "@/utils/prompts";

export async function POST(req: NextRequest, res: NextResponse) {
  const { prompt }: { prompt: string } = await req.json();
  const resumeMatch = prompt.match(/RESUME: ([\s\S]*?)\n\n-------/);
  const resumeText = resumeMatch ? resumeMatch[1].trim() : "";
  try {
    const response = generateObject({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "system",
          content: REVIEW_PROMPT,
        },
        {
          role: "user",
          content: `RESUME: ${resumeText}`,
        },
      ],
      schema: reviewSchema,
      output: "array",
    });
    return (await response).toJsonResponse();
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the resume",
      },
      {
        status: 500,
      }
    );
  }
}
