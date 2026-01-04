import { doc } from '@/lib/sheets';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await doc.loadInfo();

        // 1. Pulse
        const sheet = doc.sheetsByTitle['Pulse'];
        if (sheet) {
            await sheet.clearRows();
            await sheet.addRows([
                { type: 'payment', title_ko: '신규 구독', title_en: 'New Subscription', tech: 'Payment webhook: cus_9s8d, amount=2900', plain_ko: '사용자 @josh_lee 님이 프로 플랜으로 업그레이드 ($29)', plain_en: 'User @josh_lee upgraded to Pro Plan ($29)', time: '2m ago', color: 'yellow' },
                { type: 'deploy', title_ko: '배포 성공', title_en: 'Deploy Success', tech: 'Pipeline #8291 success: v1.3 deployed', plain_ko: '신규 업데이트 "v1.3"이 배포되었습니다', plain_en: 'New update "v1.3" is now live', time: '15m ago', color: 'teal' },
                { type: 'commit', title_ko: 'Git 커밋', title_en: 'Git Commit', tech: 'fix(ui): resolved hydration mismatch', plain_ko: '화면 깜빡임 문제를 수정했습니다', plain_en: 'Fixed screen flickering issue', time: '45m ago', color: 'gray' }
            ]);
        }

        // 2. VoC
        const vocSheet = doc.sheetsByTitle['VoC'];
        if (vocSheet) {
            await vocSheet.clearRows();
            await vocSheet.addRows([
                { id: '1', user: 'alice@corp.com', avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png', message: 'I cannot update my credit card info, it keeps spinning!', source: 'Intercom', time: '10m ago', type: 'bug', status: 'pending' },
                { id: '2', user: 'bob@startup.io', avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png', message: 'Would love to have a dark mode option for the export PDF.', source: 'Email', time: '1h ago', type: 'feature', status: 'pending' },
                { id: '3', user: 'charlie@dev.net', avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png', message: 'The API seems really slow today in the morning.', source: 'Twitter', time: '2h ago', type: 'performance', status: 'pending' }
            ]);
        }

        // 3. Projects
        const projectSheet = doc.sheetsByTitle['Projects'];
        if (projectSheet) {
            await projectSheet.clearRows();
            await projectSheet.addRows([
                { id: 'SVC-AUTH', name: 'Auth Service (OAuth2)', status: 'Active', repo: 'hip/auth-service', last_deploy: '10m ago', health: '99' },
                { id: 'SVC-PAY', name: 'Billing API', status: 'Active', repo: 'hip/billing-api', last_deploy: '1d ago', health: '100' },
                { id: 'SVC-CDN', name: 'Frontend CDN', status: 'Maintenance', repo: 'hip/web-client', last_deploy: '5m ago', health: '85' },
                { id: 'SVC-NOTI', name: 'Notification Worker', status: 'Degraded', repo: 'hip/push-worker', last_deploy: '2h ago', health: '60' }
            ]);
        }

        // 4. Pipeline
        const pipelineSheet = doc.sheetsByTitle['Pipeline'];
        if (pipelineSheet) {
            await pipelineSheet.clearRows();
            await pipelineSheet.addRows([
                { id: 'BUILD-4001', service_id: 'SVC-AUTH', version: 'v1.2.0', status: 'Success', trigger: 'Push', author: 'davidd', time: '10m ago', features: 'TASK-102, TASK-105' },
                { id: 'BUILD-4002', service_id: 'SVC-CDN', version: 'v2.1.0', status: 'Building', trigger: 'Merge', author: 'sarahj', time: '1m ago', features: 'TASK-201' },
                { id: 'BUILD-4003', service_id: 'SVC-PAY', version: 'v1.0.5', status: 'Success', trigger: 'Manual', author: 'admin', time: '1d ago', features: 'TASK-101, TASK-103' },
                { id: 'BUILD-4004', service_id: 'SVC-AUTH', version: 'v1.1.9', status: 'Failed', trigger: 'Push', author: 'davidd', time: '2h ago', features: 'TASK-104' }
            ]);
        }

        // 5. Sprint
        const sprintSheet = doc.sheetsByTitle['Sprint'];
        if (sprintSheet) {
            await sprintSheet.clearRows();
            await sprintSheet.addRows([
                { id: 'TASK-101', title: 'Implement OAuth Login', status: 'Done', assignee: 'davidd', priority: 'High' },
                { id: 'TASK-102', title: 'Fix Billing Calculation', status: 'Review', assignee: 'sarahj', priority: 'Critical' },
                { id: 'TASK-103', title: 'Update Dashboard UI', status: 'InProgress', assignee: 'ux-team', priority: 'Medium' },
                { id: 'TASK-104', title: 'Optimize CDN Cache', status: 'Todo', assignee: 'devops', priority: 'Low' }
            ]);
        }

        return NextResponse.json({ success: true, message: 'Forced Seed (Cleared & Reloaded)' });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
