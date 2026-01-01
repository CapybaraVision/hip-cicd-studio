import { getRows, doc } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rows = await getRows('VoC');
        const pending = rows.filter(r => r.status === 'pending');
        const processed = rows.filter(r => r.status === 'processed').map(r => ({
            id: `T-${r.id}`, // Mock ticket ID
            title: `Fix: ${r.message.substring(0, 30)}...`,
            priority: r.type === 'bug' ? 'Critical' : 'High',
            tags: [r.source],
            origin: r
        }));

        return NextResponse.json({ pending, processed });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['VoC'];
        const rows = await sheet.getRows();
        const row = rows.find(r => r.get('id') === id);

        if (row) {
            row.set('status', 'processed');
            await row.save();
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
