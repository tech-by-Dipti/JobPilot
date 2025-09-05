export const runtime = "nodejs";
import mammoth from "mammoth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("resume");
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("File info:", file.name, file.type);
    console.log("Buffer length:", buffer.length);

    let text = "";

    
    if (file.type === "application/pdf") {
      const pdf = (await import("pdf-parse/lib/pdf-parse.js")).default;
      const data = await pdf(buffer);
      text = data.text;
    }

   
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    else {
      return NextResponse.json({ error: "Unsupported" }, { status: 415 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Parse failed:", err);
    return NextResponse.json({ error: "Parse failed" }, { status: 500 });
  }
}
