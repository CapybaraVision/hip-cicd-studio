'use client';

import { Paper, Title, Text, Group, RingProgress, Stack, Center, ThemeIcon, Badge, Alert } from '@mantine/core';
import { Activity, TrendingUp, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ProductHealthWidget() {
    const { t } = useLanguage();
    const scores = {
        tech: 85,
        market: 42,
        growth: 78,
    };

    // Weighted Average: Tech(35%) + Market(35%) + Growth(30%)
    const totalScore = Math.round((scores.tech * 0.35) + (scores.market * 0.35) + (scores.growth * 0.3));

    const isHealthy = totalScore >= 70;
    const isCritical = totalScore < 50;

    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Group justify="space-between" mb="lg">
                <Group>
                    <Activity size={20} color={isHealthy ? 'var(--mantine-color-teal-5)' : 'var(--mantine-color-orange-5)'} />
                    <Text fw={700} size="lg">{t('title.health')}</Text>
                </Group>
                <Badge size="lg" variant="filled" color={isHealthy ? 'teal' : isCritical ? 'red' : 'orange'}>
                    Score: {totalScore}
                </Badge>
            </Group>

            <Group justify="space-around" mb="xl">
                <Stack align="center" gap="xs">
                    <RingProgress
                        size={80}
                        thickness={8}
                        roundCaps
                        sections={[{ value: scores.tech, color: 'blue' }]}
                        label={
                            <Center>
                                <ThemeIcon color="blue" variant="transparent" radius="xl">
                                    <Activity size={20} />
                                </ThemeIcon>
                            </Center>
                        }
                    />
                    <Text size="sm" fw={600}>{t('health.stability')}</Text>
                    <Text size="xs" c="blue.3">{scores.tech}/100</Text>
                </Stack>

                <Stack align="center" gap="xs">
                    <RingProgress
                        size={80}
                        thickness={8}
                        roundCaps
                        sections={[{ value: scores.market, color: 'pink' }]}
                        label={
                            <Center>
                                <ThemeIcon color="pink" variant="transparent" radius="xl">
                                    <Users size={20} />
                                </ThemeIcon>
                            </Center>
                        }
                    />
                    <Text size="sm" fw={600}>{t('health.sentiment')}</Text>
                    <Text size="xs" c="pink.3">{scores.market}/100</Text>
                </Stack>

                <Stack align="center" gap="xs">
                    <RingProgress
                        size={80}
                        thickness={8}
                        roundCaps
                        sections={[{ value: scores.growth, color: 'teal' }]}
                        label={
                            <Center>
                                <ThemeIcon color="teal" variant="transparent" radius="xl">
                                    <TrendingUp size={20} />
                                </ThemeIcon>
                            </Center>
                        }
                    />
                    <Text size="sm" fw={600}>{t('health.velocity')}</Text>
                    <Text size="xs" c="teal.3">{scores.growth}/100</Text>
                </Stack>
            </Group>

            {!isHealthy && (
                <Alert variant="light" color="orange" title={t('health.attention')} icon={<AlertTriangle size={16} />}>
                    <Text size="sm">
                        {scores.market < 50 ? t('health.critical_msg') : "Total score is below 70."}
                    </Text>
                </Alert>
            )}

            {isHealthy && (
                <Alert variant="light" color="teal" title={t('health.healthy')} icon={<CheckCircle size={16} />}>
                    <Text size="sm">
                        {t('health.healthy_msg')}
                    </Text>
                </Alert>
            )}
        </Paper>
    );
}
