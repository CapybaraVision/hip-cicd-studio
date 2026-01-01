import { getRows, doc } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const rows = await getRows('Projects');
        const projects = rows.map((r) => ({
            id: r.id,
            name: r.name,
            status: r.status,
            repo: r.repo,
            last_deploy: r.last_deploy,
            health: r.health
        }));

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await doc.loadInfo();
        let sheet = doc.sheetsByTitle['Projects'];
        if (!sheet) {
            sheet = await doc.addSheet({ title: 'Projects', headerValues: ['id', 'name', 'status', 'repo', 'last_deploy', 'health'] });
        }

        await sheet.addRow({
            id: `PROJ-${Date.now().toString().slice(-4)}`,
            name: body.name,
            status: 'Active',
            repo: body.repo || 'unknown-repo',
            last_deploy: 'Just now',
            health: '100'
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
