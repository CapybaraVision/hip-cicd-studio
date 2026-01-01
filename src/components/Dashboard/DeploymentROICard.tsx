'use client';

import { Paper, Text, Group, Button, Grid, RingProgress, Badge, Center } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight, GitMerge, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DeploymentROICard() {
    const { t } = useLanguage();

    return (
        <Paper p="md" radius="lg" style={{ background: 'linear-gradient(135deg, rgba(34, 184, 207, 0.1) 0%, rgba(34, 184, 207, 0.02) 100%)', border: '1px solid rgba(34, 184, 207, 0.2)' }}>
            <Group justify="space-between" mb="md">
                <Group gap="xs">
                    <GitMerge size={20} color="var(--mantine-color-cyan-4)" />
                    <div>
                        <Text size="sm" fw={700} c="cyan.3">{t('title.impact')}</Text>
                        <Text size="xs" c="dimmed">Deployed 2 hours ago</Text>
                    </div>
                </Group>
                <Badge color="cyan" variant="light">{t('roi.impact_high')}</Badge>
            </Group>

            <Grid>
                <Grid.Col span={4}>
                    <Paper p="xs" radius="md" bg="rgba(0,0,0,0.2)">
                        <Text size="xs" c="dimmed">{t('roi.revenue')}</Text>
                        <Group align="center" gap={4}>
                            <Text size="lg" fw={700} c="green.4">+$450</Text>
                            <ArrowUpRight size={16} color="var(--mantine-color-green-4)" />
                        </Group>
                        <Text size="xs" c="green.4" fw={500}>+12.5% vs avg</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper p="xs" radius="md" bg="rgba(0,0,0,0.2)">
                        <Text size="xs" c="dimmed">{t('roi.users')}</Text>
                        <Group align="center" gap={4}>
                            <Text size="lg" fw={700} c="blue.4">+14</Text>
                            <ArrowUpRight size={16} color="var(--mantine-color-blue-4)" />
                        </Group>
                        <Text size="xs" c="blue.4" fw={500}>Signup Spike</Text>
                    </Paper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Paper p="xs" radius="md" bg="rgba(0,0,0,0.2)">
                        <Text size="xs" c="dimmed">{t('roi.error')}</Text>
                        <Group align="center" gap={4}>
                            <Text size="lg" fw={700} c="gray.5">0.05%</Text>
                            <ArrowDownRight size={16} color="gray" />
                        </Group>
                        <Text size="xs" c="dimmed">Stable</Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Paper>
    );
}
