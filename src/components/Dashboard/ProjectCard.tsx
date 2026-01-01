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
}

export function ProjectCard({ title, description, status, tags, lastDeployed }: ProjectCardProps) {
    const getStatusColor = (s: string) => {
        if (s === 'live') return 'teal';
        if (s === 'failed') return 'red';
        return 'yellow';
    };

    const getStatusIcon = (s: string) => {
        if (s === 'live') return <CheckCircle2 size={14} />;
        if (s === 'failed') return <AlertCircle size={14} />;
        return <PlayCircle size={14} />;
    };

    return (
        <Card padding="lg" className={classes.card}>
            <Card.Section className={classes.section}>
                <Group justify="space-between">
                    <Badge
                        variant="dot"
                        size="lg"
                        color={getStatusColor(status)}
                        className={classes.badge}
                        leftSection={getStatusIcon(status)}
                    >
                        {status}
                    </Badge>
                    <ActionIcon variant="subtle" color="gray">
                        <MoreHorizontal size={18} />
                    </ActionIcon>
                </Group>
            </Card.Section>

            <Text mt="sm" fw={700} size="xl" className={classes.title}>
                {title}
            </Text>

            <Text size="sm" c="dimmed" mt={5} lineClamp={2}>
                {description}
            </Text>

            <Group mt="md" gap={8}>
                {tags.map((tag) => (
                    <Badge key={tag} variant="outline" size="sm" color="gray" radius="sm">
                        {tag}
                    </Badge>
                ))}
            </Group>

            <Card.Section className={classes.footer}>
                <Group justify="space-between">
                    <Group gap={5}>
                        <GitBranch size={14} color="gray" />
                        <Text size="xs" c="dimmed">main</Text>
                    </Group>
                    <Text size="xs" c="dimmed">Deployed {lastDeployed}</Text>
                </Group>

                {status === 'building' && (
                    <Box mt="sm">
                        <Progress value={65} animated size="sm" radius="xs" color="brand" />
                    </Box>
                )}
            </Card.Section>
        </Card>
    );
}
