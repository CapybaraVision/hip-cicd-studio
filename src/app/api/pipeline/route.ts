import { getRows } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rows = await getRows('Pipeline');
        const pipelines = rows.map((r) => ({
            id: r.id,
            service_id: r.service_id,
            version: r.version,
            status: r.status,
            trigger: r.trigger,
            author: r.author,
            time: r.time,
            features: r.features || ''
        }));

        return NextResponse.json(pipelines);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
