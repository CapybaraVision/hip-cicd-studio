'use client';

import { Card, Text, Badge, Group, ActionIcon, Progress, Box } from '@mantine/core';
import { MoreHorizontal, GitBranch, ExternalLink, PlayCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import classes from './ProjectCard.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
    status: string;
    tags: string[];
    lastDeployed: string;
    selected?: boolean;
}

export function ProjectCard({ title, description, status, tags, lastDeployed, selected }: ProjectCardProps) {
    const getStatusColor = (s: string) => {
        const lower = (s || '').toLowerCase();
        if (lower.includes('active') || lower === 'live') return 'teal';
        if (lower.includes('maintenance')) return 'orange';
        if (lower.includes('inactive')) return 'gray';
        if (lower.includes('degraded')) return 'yellow';
        if (lower === 'failed') return 'red';
        return 'blue';
    };

    const getStatusIcon = (s: string) => {
        const lower = (s || '').toLowerCase();
        if (lower.includes('active') || lower === 'live') return <CheckCircle2 size={12} />;
        if (lower === 'failed') return <AlertCircle size={12} />;
        if (lower.includes('maintenance')) return <PlayCircle size={12} />;
        return <PlayCircle size={12} />;
    };

    return (
        <Card
            padding="lg"
            className={classes.card}
            withBorder={selected}
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                ...(selected ? { borderColor: 'var(--mantine-color-teal-6)', borderWidth: 2 } : {})
            }}
        >
            <Card.Section className={classes.section} pt="md" px="lg">
                <Group justify="space-between">
                    <Badge
                        variant="light"
                        size="sm"
                        color={getStatusColor(status)}
                        leftSection={getStatusIcon(status)}
                        radius="sm"
                    >
                        {status}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray" size="sm">
                        <MoreHorizontal size={16} />
                    </ActionIcon>
                </Group>
            </Card.Section>

            <Text mt="sm" fw={700} size="xl" className={classes.title}>
                {title}
            </Text>

            <Text size="sm" c="dimmed" mt={5} lineClamp={2} style={{ flex: 1 }}>
                {description}
            </Text>

            <Group mt="md" gap={8}>
                {tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm" color="gray" radius="sm">
                        {tag}
                    </Badge>
                ))}
            </Group>

            <Card.Section className={classes.footer} mt="auto">
                <Group justify="space-between">
                    <Group gap={5}>
                        <GitBranch size={14} color="gray" />
                        <Text size="xs" c="dimmed">main</Text>
                    </Group>
                    <Text size="xs" c="dimmed">Deployed {lastDeployed}</Text>
                </Group>

                {status?.toLowerCase() === 'building' && (
                    <Box mt="sm">
                        <Progress value={65} animated size="sm" radius="xs" color="brand" />
                    </Box>
                )}
            </Card.Section>
        </Card>
    );
}
