'use client';

import { Container, Title, Text, Group, Button, Paper, Stack, Code, ScrollArea, Badge, Timeline as MantineTimeline } from '@mantine/core';
import { Play, RotateCcw, Terminal, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Sidebar } from '@/components/Layout/Sidebar';

export default function CICDPage() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, marginLeft: 80, minHeight: '100vh', padding: '2rem' }}>
                <Container size="xl">
                    <Group justify="space-between" mb="xl">
                        <div>
                            <Title order={1}>Pipelines</Title>
                            <Text c="dimmed">Live build logs and deployment history.</Text>
                        </div>
                        <Button leftSection={<Play size={18} />} color="teal">Run Pipeline</Button>
                    </Group>

                    <Group align="flex-start" grow>
                        <Stack>
                            <Paper p="md" withBorder radius="md" bg="dark.7">
                                <Title order={4} mb="md">Recent Builds</Title>
                                <MantineTimeline active={1} bulletSize={24} lineWidth={2}>
                                    <MantineTimeline.Item bullet={<CheckCircle2 size={12} />} title="Deploy to Production" color="teal">
                                        <Text c="dimmed" size="xs">2 hours ago</Text>
                                        <Text size="sm" mt={4}>Commit: 8f3a2c1 (Fix login bug)</Text>
                                    </MantineTimeline.Item>

                                    <MantineTimeline.Item bullet={<Clock size={12} />} title="Build #1024" color="blue" lineVariant="dashed">
                                        <Text c="dimmed" size="xs">Running (4m 20s)</Text>
                                        <Text size="sm" mt={4}>Commit: a1b2c3d (Update dashboard)</Text>
                                    </MantineTimeline.Item>

                                    <MantineTimeline.Item bullet={<XCircle size={12} />} title="Build #1023" color="red">
                                        <Text c="dimmed" size="xs">Failed 1 day ago</Text>
                                        <Text size="sm" mt={4}>Commit: 9988776 (Refactor auth)</Text>
                                    </MantineTimeline.Item>
                                </MantineTimeline>
                            </Paper>
                        </Stack>

                        <Paper p="xl" withBorder radius="md" bg="#0d1117" style={{ flex: 2 }}>
                            <Group justify="space-between" mb="md">
                                <Group gap="xs">
                                    <Terminal size={18} color="#8b949e" />
                                    <Text c="dimmed" fw={700} size="sm">Build Log #1024</Text>
                                </Group>
                                <Badge variant="outline" color="blue">Running</Badge>
                            </Group>
                            <ScrollArea h={400} type="always">
                                <Code block bg="transparent" c="gray.4" style={{ fontSize: 13, lineHeight: 1.6 }}>
                                    {`> hip-cicd-studio@0.1.0 build
> next build

   ▲ Next.js 16.1.1
   
   Creating an optimized production build ...
   ✓ Compiled successfully
   ✓ Linting and checking validity of types
   ✓ Collecting page data
   ✓ Generating static pages (5/5)
   ✓ Collecting build traces
   ✓ Finalizing page optimization
   
   Route (app)                              Size     First Load JS
   ┌ ○ /                                    5.4 kB         87.3 kB
   ├ ○ /_not-found                          871 B          87.9 kB
   ├ ○ /cicd                                1.2 kB         83.1 kB
   └ ○ /projects                            2.1 kB           84 kB
   + First Load JS shared by all            87 kB
     ├ chunks/23-88c93a027987e95b.js        31.5 kB
     ├ chunks/fd9d1056-2821b0f0bbc342f4.js  53.6 kB
     └ other shared chunks (total)          1.86 kB

○  (Static)  prerendered as static content
`}
                                </Code>
                            </ScrollArea>
                        </Paper>
                    </Group>

                </Container>
            </main>
        </div>
    );
}
