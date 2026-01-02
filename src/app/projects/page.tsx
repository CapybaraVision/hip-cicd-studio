'use client';

import { Sidebar } from '@/components/Layout/Sidebar';
import { SystemStatus } from '@/components/Dashboard/SystemStatus';

export default function ProjectsPage() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, marginLeft: 80, minHeight: '100vh', padding: '2rem' }}>
                <SystemStatus />
            </main>
        </div>
    );
}
