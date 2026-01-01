import { getRows } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rows = await getRows('Pulse');
        return NextResponse.json(rows, {
            headers: {
                'Cache-Control': 's-maxage=5, stale-while-revalidate=59', // Cache for 5s, background update for 1m
            },
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
