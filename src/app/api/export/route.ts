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

    }

        if (format === 'html') {
        const html = `
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
                        h1 { border-bottom: 2px solid #eee; padding-bottom: 10px; }
                        h2 { margin-top: 40px; color: #0066cc; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                        th { background-color: #f8f9fa; font-weight: 600; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                    </style>
                </head>
                <body>
                    <h1>Hip CICD Studio - System Report</h1>
                    <p>Generated at: ${new Date().toLocaleString()}</p>
                    
                    ${sheets.map(sheetName => {
            const rows = data[sheetName] as any[];
            if (!rows || rows.length === 0) return `<h2>${sheetName}</h2><p>No data</p>`;
            const headers = Object.keys(rows[0]);
            return `
                            <h2>${sheetName}</h2>
                            <table>
                                <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                                <tbody>
                                    ${rows.map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('')}
                                </tbody>
                            </table>
                        `;
        }).join('')}
                </body>
                </html>
            `;
        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Disposition': 'inline; filename="system-report.html"' // Inline so it opens in browser tab
            }
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
