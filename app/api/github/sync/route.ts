import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Call backend API to sync GitHub data
    const response = await fetch(
      `${process.env.API_URL}/api/v1/github/sync`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error syncing GitHub:', error);
    return NextResponse.json(
      { error: 'Failed to sync GitHub' },
      { status: 500 }
    );
  }
}
