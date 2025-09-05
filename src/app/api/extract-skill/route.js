import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { resumeText } = await request.json();
    if (!resumeText)
      return NextResponse.json({ error: "No text" }, { status: 400 });

    const prompt = `
      Extract only the professional skills mentioned in this resume text.
      Return them as a JSON array of strings, nothing else.

      Resume text:
      ${resumeText}
    `;

    const responce = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    let skills = [];
    try {
      skills = JSON.parse(responce.choices[0].message.content);
    } catch (error) {
      skills = responce.choices[0].message.content
        .split(",")
        .map((s) => s.replace(/[\[\]"]/g, "").trim());
    }
    return NextResponse.json({ skills });
  } catch (error) {
    return NextResponse.json({ error: "Skill extraction failed" }, { status: 500 });
  }
}
