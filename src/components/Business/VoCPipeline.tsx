'use client';

import { Paper, Title, Text, Group, Button, Badge, ScrollArea, Avatar, ActionIcon, Stack, Card } from '@mantine/core';
import { MessageCircle, ArrowRight, Bug, Zap, CheckCircle2, AlertTriangle, Bot } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const initialFeedbacks = [
    { id: 1, user: 'alice@corp.com', avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png', message: 'I cannot update my credit card info, it keeps spinning!', source: 'Intercom', time: '10m ago', type: 'bug' },
    { id: 2, user: 'bob@startup.io', avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png', message: 'Would love to have a dark mode option for the export PDF.', source: 'Email', time: '1h ago', type: 'feature' },
    { id: 3, user: 'charlie@dev.net', avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png', message: 'The API seems really slow today in the morning.', source: 'Twitter', time: '2h ago', type: 'performance' },
];

export function VoCPipeline() {
    const { t } = useLanguage();
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    const [processed, setProcessed] = useState<any[]>([]);
    const [processing, setProcessing] = useState(false);

    const handleProcess = () => {
        setProcessing(true);
        setTimeout(() => {
            const newTicket = {
                id: 'T-1042',
                title: 'Fix Credit Card Update Spinner Logic',
                priority: 'Critical',
                tags: ['Payment', 'Frontend'],
                origin: processed.length === 0 ? feedbacks[0] : null
            };

            if (feedbacks.length > 0) {
                setProcessed([newTicket, ...processed]);
                setFeedbacks(feedbacks.slice(1));
            }
            setProcessing(false);
        }, 1500);
    };

    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Group justify="space-between" mb="md">
                <Group gap="xs">
                    <MessageCircle size={20} className="mantine-rotate-180" />
                    <Text fw={700}>{t('title.voc')}</Text>
                    <Badge variant="light" color="blue">3 Pending</Badge>
                </Group>
                <Button
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan' }}
                    size="xs"
                    loading={processing}
                    leftSection={<Bot size={14} />}
                    onClick={handleProcess}
                    disabled={feedbacks.length === 0}
                >
                    {t('voc.process_btn')}
                </Button>
            </Group>

            <Group align="flex-start" grow>
                {/* Pending Feedback Column */}
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="xs" c="dimmed" fw={700}>{t('voc.incoming')}</Text>
                    {feedbacks.length === 0 && <Text size="sm" c="dimmed" fs="italic">{t('voc.empty_feedback')}</Text>}
                    {feedbacks.map((item) => (
                        <Card key={item.id} p="sm" radius="md" bg="dark.6" withBorder>
                            <Group justify="space-between" mb="xs">
                                <Group gap="xs">
                                    <Avatar src={item.avatar} size="xs" radius="xl" />
                                    <Text size="xs" fw={500}>{item.user}</Text>
                                </Group>
                                <Badge size="xs" variant="outline" color="gray">{item.source}</Badge>
                            </Group>
                            <Text size="sm" lineClamp={2} mb="xs">"{item.message}"</Text>
                            <Group gap="xs">
                                {item.type === 'bug' && <Badge size="xs" color="red" leftSection={<Bug size={10} />}>Bug</Badge>}
                                {item.type === 'feature' && <Badge size="xs" color="blue" leftSection={<Zap size={10} />}>Feature</Badge>}
                                {item.type === 'performance' && <Badge size="xs" color="orange" leftSection={<AlertTriangle size={10} />}>Perf</Badge>}
                            </Group>
                        </Card>
                    ))}
                </Stack>

                {/* AI Processing Arrow */}
                <Stack align="center" justify="center" h={200} visibleFrom="sm">
                    <ArrowRight size={24} color="gray" />
                </Stack>

                {/* Tickets Column */}
                <Stack gap="xs" style={{ flex: 1 }}>
                    <Text size="xs" c="dimmed" fw={700}>{t('voc.generated')}</Text>
                    {processed.length === 0 && <Text size="sm" c="dimmed" fs="italic">{t('voc.empty_ticket')}</Text>}
                    {processed.map((ticket, idx) => (
                        <Card key={idx} p="sm" radius="md" bg="rgba(40, 50, 60, 0.5)" style={{ borderLeft: '4px solid var(--mantine-color-teal-5)' }} withBorder>
                            <Group justify="space-between" mb="xs">
                                <Text size="xs" fw={700} c="teal.4">{ticket.id}</Text>
                                <Badge size="xs" color="red" variant="filled">{ticket.priority}</Badge>
                            </Group>
                            <Text size="sm" fw={600} mb="xs">{ticket.title}</Text>
                            <Group gap="xs">
                                {ticket.tags.map((tag: string) => (
                                    <Badge key={tag} size="xs" variant="dot" color="gray">{tag}</Badge>
                                ))}
                            </Group>
                            {ticket.origin && (
                                <Text size="xs" c="dimmed" mt="xs" fs="italic">Derived from user: {ticket.origin.user}</Text>
                            )}
                        </Card>
                    ))}
                </Stack>
            </Group>
        </Paper>
    );
}
