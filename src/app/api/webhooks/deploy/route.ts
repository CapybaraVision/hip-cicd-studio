import { doc } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        // In a real app, verify signature/secret here
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['Pipeline'];

        if (!sheet) {
            return NextResponse.json({ error: 'Pipeline sheet not found' }, { status: 404 });
        }

        // Simulate reading body or just use defaults
        const body = await req.json().catch(() => ({}));

        const newRow = {
            id: `BUILD-${Math.floor(Math.random() * 9000) + 1000}`,
            service_id: body.service_id || 'SVC-WEBHOOK',
            version: body.version || 'v.next',
            status: 'Building',
            trigger: 'Webhook',
            author: 'system',
            time: 'Just now',
            features: 'External Trigger'
        };

        await sheet.addRow(newRow);

        return NextResponse.json({ success: true, build_id: newRow.id });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
