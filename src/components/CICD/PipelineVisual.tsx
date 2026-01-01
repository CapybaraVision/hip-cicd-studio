'use client';

import { Paper, Text, Group, ThemeIcon, Progress, Stack, RingProgress, Center } from '@mantine/core';
import { GitCommit, Package, TestTube, Rocket, Check, Loader } from 'lucide-react';

export function PipelineVisual() {
    return (
        <Paper withBorder p="xl" radius="md" mb="xl" bg="dark.8">
            <Text size="lg" fw={700} mb="xl">Current Deployment Pipeline</Text>

            <Group justify="space-between" align="flex-start" wrap="nowrap">
                {/* Step 1: Source */}
                <PipelineStep
                    icon={<GitCommit size={20} />}
                    label="Source Code"
                    status="completed"
                    color="teal"
                />
                <Connector status="completed" />

                {/* Step 2: Build */}
                <PipelineStep
                    icon={<Package size={20} />}
                    label="Build"
                    status="completed"
                    color="teal"
                />
                <Connector status="completed" />

                {/* Step 3: Test */}
                <PipelineStep
                    icon={<TestTube size={20} />}
                    label="Test"
                    status="processing"
                    color="blue"
                />
                <Connector status="pending" />

                {/* Step 4: Deploy */}
                <PipelineStep
                    icon={<Rocket size={20} />}
                    label="Deploy"
                    status="pending"
                    color="gray"
                />
            </Group>

            <Paper mt="xl" p="md" radius="sm" bg="dark.9" withBorder style={{ borderColor: '#333' }}>
                <Group gap="sm">
                    <Loader size={16} color="blue" />
                    <Text size="sm" c="dimmed">Test Runner executing... (3/12 completed)</Text>
                </Group>
            </Paper>
        </Paper>
    );
}

function PipelineStep({ icon, label, status, color }: { icon: any, label: string, status: 'completed' | 'processing' | 'pending', color: string }) {
    const isProcessing = status === 'processing';
    const isCompleted = status === 'completed';

    return (
        <Stack align="center" gap="xs" style={{ minWidth: 80, position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'relative' }}>
                {isProcessing ? (
                    <RingProgress
                        size={56}
                        thickness={4}
                        roundCaps
                        sections={[{ value: 40, color: color }]}
                        label={
                            <Center>
                                <ThemeIcon radius="xl" size={40} color="dark.6">
                                    <div style={{ color: 'var(--mantine-color-blue-4)' }}>{icon}</div>
                                </ThemeIcon>
                            </Center>
                        }
                    />
                ) : (
                    <ThemeIcon
                        radius="xl"
                        size={50}
                        color={isCompleted ? color : 'dark.5'}
                        variant={isCompleted ? 'light' : 'filled'}
                    >
                        {icon}
                    </ThemeIcon>
                )}

                {isCompleted && (
                    <ThemeIcon
                        size={18}
                        radius="xl"
                        color={color}
                        style={{ position: 'absolute', bottom: -2, right: -2, border: '2px solid #1A1B1E' }}
                    >
                        <Check size={10} />
                    </ThemeIcon>
                )}
            </div>
            <Text size="sm" fw={500} c={status === 'pending' ? 'dimmed' : 'white'}>{label}</Text>
        </Stack>
    );
}

function Connector({ status }: { status: 'completed' | 'processing' | 'pending' }) {
    return (
        <div style={{ flex: 1, marginTop: 25, height: 2, background: 'var(--mantine-color-dark-4)', position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: status === 'completed' ? '100%' : '50%',
                    background: status === 'pending' ? 'transparent' : 'var(--mantine-color-teal-6)',
                    transition: 'width 1s ease'
                }}
            />
        </div>
    );
}
