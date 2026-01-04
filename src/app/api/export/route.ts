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
            const sheet = doc.sheetsByTitle[sheetName];
            if (!sheet) continue;

            const rows = await getRows(sheetName);
            // Simple serialization of rows
            data[sheetName] = rows.map(r => {
                const obj: any = {};
                // sheet.headerValues should be populated after loadInfo
                if (sheet.headerValues) {
                    sheet.headerValues.forEach((h: any) => {
                        obj[h] = r[h];
                    });
                } else {
                    // Fallback if no headers found (shouldn't happen if initialized)
                    Object.assign(obj, r);
                }
                return obj;
            });
        }

        if (format === 'csv') {
            let csvContent = '';

            for (const [sheetName, rows] of Object.entries(data)) {
                csvContent += `=== ${sheetName} ===\n`;
                const rowArray = rows as any[];
                if (rowArray.length > 0) {
                    const headers = Object.keys(rowArray[0]);
                    csvContent += headers.join(',') + '\n';
                    rowArray.forEach(row => {
                        const values = headers.map(header => {
                            const val = row[header];
                            // Escape commas and quotes
                            const stringVal = String(val === null || val === undefined ? '' : val);
                            if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
                                return `"${stringVal.replace(/"/g, '""')}"`;
                            }
                            return stringVal;
                        });
                        csvContent += values.join(',') + '\n';
                    });
                } else {
                    csvContent += '(No Data)\n';
                }
                csvContent += '\n';
            }

            return new NextResponse(csvContent, {
                headers: {
                    'Content-Type': 'text/csv; charset=utf-8',
                    'Content-Disposition': 'attachment; filename="hip-cicd-report.csv"'
                }
            });
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
