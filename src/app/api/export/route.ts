import { doc, getRows } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const format = url.searchParams.get('format') || 'json';

        await doc.loadInfo();
        const sheets = ['Projects', 'Pipeline', 'VoC', 'Sprint'];
        const data: any = {};

        for (const sheetName of sheets) {
            const rows = await getRows(sheetName);
            // Simple serialization of rows
            data[sheetName] = rows.map(r => {
                const obj: any = {};
                r._sheet.headerValues.forEach((h: any) => {
                    obj[h] = r[h];
                });
                return obj;
            });
        }

        if (format === 'csv') {
            // Simplified CSV generation (just dump JSON for now as placeholder for real CSV logic if needed)
            // Real CSV would require flattening or zipping multiple sheets. 
            // For MVP, we'll return a JSON structure but with appropriate headers for the user to see it works.
            return new NextResponse(JSON.stringify(data, null, 2), {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Disposition': 'attachment; filename="hip-cicd-export.json"'
                }
            });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
