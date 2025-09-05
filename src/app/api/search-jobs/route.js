export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

const skillMap = {
  design: 'design',
  figma: 'design',
  photoshop: 'design',
  ui: 'design',
  ux: 'design',
  data: 'data',
  marketing: 'marketing',
  sales: 'sales',
  finance: 'finance',
  legal: 'legal',
  writing: 'writing',
  hr: 'hr',
  teaching: 'teaching',
};

export async function POST(req) {
  try {
    const { skills, location = 'remote' } = await req.json();
    const keyword = skills.length ? skills[0] : 'react';
    const category = skillMap[keyword.toLowerCase()] || '';
    const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(
      keyword
    )}${category ? `&category=${category}` : ''}`;

    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data.jobs?.slice(0, 10) || []);
  } catch (error) {
    return NextResponse.json({ error: 'Jobs fetch failed' }, { status: 500 });
  }
}