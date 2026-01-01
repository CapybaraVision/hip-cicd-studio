import { getRows, doc } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rows = await getRows('Sprint');
        const items = rows.map((r, i) => ({
            id: r.id || `item-${i}`,
            title: r.title,
            status: r.status,
            assignee: r.assignee,
            priority: r.priority
        }));

        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle['Sprint'];
        if (!sheet) {
            sheet = await doc.addSheet({ title: 'Sprint', headerValues: ['id', 'title', 'status', 'assignee', 'priority'] });
        }

        await sheet.addRow({
            id: `TASK-${Date.now().toString().slice(-4)}`,
            title: body.title,
            status: body.status || 'Todo',
            assignee: body.assignee || 'Unassigned',
            priority: body.priority || 'Medium'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
