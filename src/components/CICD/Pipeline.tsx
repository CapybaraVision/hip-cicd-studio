'use client';

import { Paper, Title, Text, Group, ThemeIcon, Stack, RingProgress, Center } from '@mantine/core';
import { GitCommit, Package, TestTube, Rocket, CheckCircle2, CircleDashed } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, label: '소스 코드', icon: GitCommit, status: 'completed' },
    { id: 2, label: '빌드', icon: Package, status: 'completed' },
    { id: 3, label: '테스트', icon: TestTube, status: 'processing' },
    { id: 4, label: '배포', icon: Rocket, status: 'pending' },
];

export function Pipeline() {
    return (
        <Stack gap="xl">
            <Title order={3}>현재 배포 파이프라인</Title>
            {/* Desktop View (Horizontal) */}
            <Group justify="center" gap={0} visibleFrom="sm" w="100%">
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    return (
                        <Group key={step.id} gap={0} align="center" style={{ flex: isLast ? 0 : 1 }}>
                            <Stack align="center" gap="xs" style={{ zIndex: 2, position: 'relative' }}>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        {step.status === 'processing' && (
                                            <div style={{ position: 'absolute', top: -5, left: -5, right: -5, bottom: -5 }}>
                                                <RingProgress
                                                    size={60}
                                                    thickness={3}
                                                    sections={[{ value: 75, color: 'cyan' }]}
                                                    style={{ animation: 'spin 2s linear infinite' }}
                                                />
                                                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                                            </div>
                                        )}
                                        <ThemeIcon
                                            size={50}
                                            radius="xl"
                                            variant={step.status === 'pending' ? 'outline' : 'light'}
                                            color={step.status === 'completed' ? 'teal' : step.status === 'processing' ? 'cyan' : 'gray'}
                                        >
                                            <step.icon size={24} />
                                        </ThemeIcon>

                                        {step.status === 'completed' && (
                                            <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#1a1b1e', borderRadius: '50%' }}>
                                                <CheckCircle2 size={16} color="var(--mantine-color-teal-5)" fill="var(--mantine-color-teal-9)" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                                <Text fw={600} size="sm" c={step.status === 'pending' ? 'dimmed' : 'white'}>{step.label}</Text>
                            </Stack>

                            {!isLast && (
                                <div style={{ flex: 1, height: 2, background: 'var(--mantine-color-dark-4)', margin: '0 20px', position: 'relative', top: -14 }}>
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: '100%', opacity: step.status === 'completed' ? 1 : 0.3 }}
                                        transition={{ delay: index * 0.2 + 0.1, duration: 0.5 }}
                                        style={{ height: '100%', background: 'var(--mantine-color-teal-6)' }}
                                    />
                                </div>
                            )}
                        </Group>
                    )
                })}
            </Group>

            {/* Mobile View (Vertical) */}
            <Stack hiddenFrom="sm" w="100%" gap="md" align="center">
                {steps.map((step, index) => (
                    <Group key={step.id} w="100%" justify="space-between">
                        <Group>
                            <ThemeIcon
                                size={40}
                                radius="xl"
                                variant={step.status === 'pending' ? 'outline' : 'light'}
                                color={step.status === 'completed' ? 'teal' : step.status === 'processing' ? 'cyan' : 'gray'}
                            >
                                <step.icon size={20} />
                            </ThemeIcon>
                            <Text fw={600}>{step.label}</Text>
                        </Group>
                        {step.status === 'completed' && <CheckCircle2 color="teal" size={20} />}
                        {step.status === 'processing' && <Text c="cyan" size="xs">Running...</Text>}
                    </Group>
                ))}
            </Stack>

            <Paper p="xl" radius="md" withBorder bg="dark.8" mt="xl">
                <Group>
                    <CircleDashed size={20} className="spin" />
                    <Text>테스트 러너가 실행 중입니다... (3/12 완료)</Text>
                </Group>
                {/* Terminal output mockup could go here */}
            </Paper>
        </Stack>
    );
}
