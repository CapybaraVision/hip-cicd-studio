'use client';

import { useState, useEffect } from 'react';
import { Paper, Text, Timeline, ThemeIcon, Group, Badge, Switch, Tooltip, Loader, Center } from '@mantine/core';
import { GitCommit, Rocket, DollarSign, Activity, AlertCircle, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';



const ICON_MAP: Record<string, any> = {
    payment: DollarSign,
    deploy: Rocket,
    commit: GitCommit,
    alert: AlertCircle,
    activity: Activity
};

export function PulseFeed() {
    const [aiMode, setAiMode] = useState(true);
    const { lang, t } = useLanguage();
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch('/api/pulse');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setEvents(data);
                }
            } catch (e) {
                console.error("Failed to fetch pulse", e);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const displayEvents = events.map(e => ({
        ...e,
        title: lang === 'ko' ? e.title_ko : e.title_en,
        plain: lang === 'ko' ? e.plain_ko : e.plain_en,
        icon: ICON_MAP[e.type] || Activity
    }));

    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Group justify="space-between" mb="lg">
                <Group gap="xs">
                    <Text tt="uppercase" c="dimmed" fw={700} size="xs">{t('title.pulse')}</Text>
                    {aiMode && (
                        <Badge variant="gradient" gradient={{ from: 'violet', to: 'cyan' }} size="xs">
                            <Group gap={4}>
                                <Bot size={10} /> {t('pulse.ai_on')}
                            </Group>
                        </Badge>
                    )}
                </Group>

                <Tooltip label="Translate technical logs to plain language" position="left">
                    <Switch
                        size="xs"
                        label={t('pulse.ai_mode')}
                        checked={aiMode}
                        onChange={(event) => setAiMode(event.currentTarget.checked)}
                        color="violet"
                    />
                </Tooltip>
            </Group>

            {loading ? (
                <Center h={200}>
                    <Loader size="sm" variant="dots" />
                </Center>
            ) : (
                <Timeline active={1} bulletSize={24} lineWidth={2}>
                    {displayEvents.map((event: any, index: number) => (
                        <Timeline.Item
                            key={index}
                            bullet={
                                <ThemeIcon size={22} variant="gradient" gradient={{ from: event.color === 'gray' ? 'dark.5' : event.color, to: event.color === 'gray' ? 'dark.3' : `${event.color}.4` }} radius="xl">
                                    <event.icon size={12} />
                                </ThemeIcon>
                            }
                            title={<Text size="sm" fw={600} c="white">{event.title}</Text>}
                            lineVariant="dashed"
                        >
                            <Text c="dimmed" size="xs" mt={4}>
                                {aiMode ? event.plain : event.tech}
                            </Text>
                            <Text c="dimmed" size="xs" mt={4} style={{ fontSize: 10 }}>{event.time}</Text>
                        </Timeline.Item>
                    ))}
                </Timeline>
            )}
        </Paper>
    );
}
