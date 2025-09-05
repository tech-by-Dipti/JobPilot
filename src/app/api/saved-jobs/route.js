export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import Job from '@/lib/models/Job';
import mongoose from 'mongoose';
import { connectionStr } from '@/lib/db';


export async function GET() {
  await mongoose.connect(connectionStr);
  const jobs = await Job.find().sort({ savedAt: -1 });
  return NextResponse.json(jobs);
}