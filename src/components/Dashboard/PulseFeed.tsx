'use client';

import { useState } from 'react';
import { Paper, Text, Timeline, ThemeIcon, Group, Badge, Switch, Tooltip } from '@mantine/core';
import { GitCommit, Rocket, DollarSign, Activity, AlertCircle, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const getEvents = (lang: string) => [
    {
        type: 'payment',
        title: lang === 'ko' ? '신규 구독' : 'New Subscription',
        tech: 'Payment webhook received: customer_id=cus_9s8d, amount=2900',
        plain: lang === 'ko' ? '사용자 @josh_lee 님이 프로 플랜으로 업그레이드 ($29)' : 'User @josh_lee upgraded to Pro Plan ($29)',
        time: lang === 'ko' ? '2분 전' : '2m ago',
        icon: DollarSign,
        color: 'yellow'
    },
    {
        type: 'deploy',
        title: lang === 'ko' ? '배포 성공' : 'Deploy Success',
        tech: 'Pipeline #8291 success: v1.3 deployed to production',
        plain: lang === 'ko' ? '신규 업데이트 "v1.3"이 배포되었습니다' : 'New update "v1.3" is now live for all users',
        time: lang === 'ko' ? '15분 전' : '15m ago',
        icon: Rocket,
        color: 'teal'
    },
    {
        type: 'commit',
        title: lang === 'ko' ? 'Git 커밋' : 'Git Commit',
        tech: 'fix(ui): resolved hydration mismatch in layout.tsx',
        plain: lang === 'ko' ? '앱 실행 시 "화면 깜빡임" 문제를 수정했습니다' : 'Fixed the "screen flickering" issue on startup',
        time: lang === 'ko' ? '45분 전' : '45m ago',
        icon: GitCommit,
        color: 'gray'
    },
    {
        type: 'alert',
        title: lang === 'ko' ? '성능 경고' : 'Performance Alert',
        tech: 'Latency > 200ms (p99) detected in /api/data',
        plain: lang === 'ko' ? '서버가 약간 느려졌습니다 (자동 확인 중...)' : 'Server is running a bit slow (checking automatically...)',
        time: lang === 'ko' ? '1시간 전' : '1h ago',
        icon: AlertCircle,
        color: 'red'
    },
    {
        type: 'payment',
        title: lang === 'ko' ? '신규 구독' : 'New Subscription',
        tech: 'Payment webhook: sku_starter_pack purchased',
        plain: lang === 'ko' ? '사용자 @sarah_k 님이 "스타터 팩"을 구매했습니다' : 'User @sarah_k bought "Starter Pack"',
        time: lang === 'ko' ? '2시간 전' : '2h ago',
        icon: DollarSign,
        color: 'yellow'
    },
];

export function PulseFeed() {
    const [aiMode, setAiMode] = useState(true);
    const { lang, t } = useLanguage();

    const events = getEvents(lang);

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

            <Timeline active={1} bulletSize={24} lineWidth={2}>
                {events.map((event, index) => (
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
        </Paper>
    );
}
