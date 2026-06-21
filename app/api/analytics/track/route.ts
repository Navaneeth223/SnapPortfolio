import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to backend API
    await fetch(`${process.env.API_URL}/api/v1/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    // Don't fail - analytics should be fire-and-forget
    return new NextResponse(null, { status: 204 });
  }
}
