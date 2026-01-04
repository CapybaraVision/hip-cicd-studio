'use client';

import { Container } from '@mantine/core';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Pipeline } from '@/components/CICD/Pipeline';

export default function CICDPage() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, marginLeft: 80, minHeight: '100vh', padding: '2rem' }}>
                <Container size="xl">
                    <Pipeline />
                </Container>
            </main>
        </div>
    );
}
