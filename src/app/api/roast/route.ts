import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/utils/groq";
import { streamText } from "ai";
import { ROAST_PROMPT } from "@/utils/prompts";

export async function POST(req: NextRequest) {
  const { prompt }: { prompt: string } = await req.json();

  const roastLevelMatch = prompt.match(/ROAST_LEVEL: (.*?)\n/);
  const resumeMatch = prompt.match(/RESUME: ([\s\S]*?)\n\n-------/);

  const roastLevel = roastLevelMatch ? roastLevelMatch[1] : "mild";
  const resumeText = resumeMatch ? resumeMatch[1].trim() : "";

  try {
    const response = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "system",
          content: ROAST_PROMPT,
        },
        {
          role: "user",
          content: `ROAST_LEVEL: ${roastLevel}\n\nRESUME: ${resumeText}\n\n-------`,
        },
      ],
    });
    return response.toDataStreamResponse();
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
