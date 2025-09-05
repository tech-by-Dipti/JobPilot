export const runtime = "nodejs";
import { connectionStr } from "@/lib/db";
import Job from "@/lib/models/Job";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await mongoose.connect(connectionStr);
    const body = await request.json();

    // ✅ sanitize incoming data
    const jobData = {
      title: body.title || "",
      url: body.url || "",
      company_name: body.company_name || "",
      candidate_required_location: body.candidate_required_location || "",
      category: body.category || "",
      job_type: body.job_type || "",
      publication_date: body.publication_date || "",
    };

    const job = await Job.create(jobData);
    return NextResponse.json({ success: true, id: job._id });
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { success: false, error: "Job save failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await mongoose.connect(connectionStr);
    const { id } = await request.json();
    await Job.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { success: false, error: "Delete failed" },
      { status: 500 }
    );
  }
}
