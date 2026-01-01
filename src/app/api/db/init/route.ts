import { doc } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await doc.loadInfo();

        const sheets = ['Pulse', 'VoC', 'Stats', 'Sprint', 'Projects'];
        const results = [];

        for (const title of sheets) {
            let sheet = doc.sheetsByTitle[title];
            if (!sheet) {
                sheet = await doc.addSheet({ title });
                // Add Headers
                if (title === 'Pulse') {
                    await sheet.setHeaderRow(['type', 'title_ko', 'title_en', 'tech', 'plain_ko', 'plain_en', 'time', 'color']);
                    await sheet.addRows([
                        { type: 'payment', title_ko: '신규 구독', title_en: 'New Subscription', tech: 'Payment webhook: cus_9s8d, amount=2900', plain_ko: '사용자 @josh_lee 님이 프로 플랜으로 업그레이드 ($29)', plain_en: 'User @josh_lee upgraded to Pro Plan ($29)', time: '2m ago', color: 'yellow' },
                        { type: 'deploy', title_ko: '배포 성공', title_en: 'Deploy Success', tech: 'Pipeline #8291 success: v1.3 deployed', plain_ko: '신규 업데이트 "v1.3"이 배포되었습니다', plain_en: 'New update "v1.3" is now live', time: '15m ago', color: 'teal' },
                        { type: 'commit', title_ko: 'Git 커밋', title_en: 'Git Commit', tech: 'fix(ui): resolved hydration mismatch', plain_ko: '화면 깜빡임 문제를 수정했습니다', plain_en: 'Fixed screen flickering issue', time: '45m ago', color: 'gray' }
                    ]);
                    results.push(`Seeded ${title}`);
                } else if (title === 'VoC') {
                    await sheet.setHeaderRow(['id', 'user', 'avatar', 'message', 'source', 'time', 'type', 'status']);
                } else if (title === 'Stats') {
                    await sheet.setHeaderRow(['date', 'active_users', 'conversion_rate', 'retention', 'system_health']);
                } else if (title === 'Projects') {
                    await sheet.setHeaderRow(['id', 'name', 'status', 'repo', 'last_deploy', 'health']);
                }
                results.push(`Created ${title}`);
            } else {
                results.push(`${title} exists`);
            }
        }

        return NextResponse.json({ success: true, results });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
