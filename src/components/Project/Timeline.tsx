'use client';

import { Paper, Text, Avatar, Group, Box, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';

const phases = [
    { id: 1, title: 'Q1 기획', date: 'Jan - Mar', status: 'done', user: 'https://ui.shadcn.com/avatars/01.png' },
    { id: 2, title: 'MVP 개발', date: 'Apr - Jun', status: 'active', user: 'https://ui.shadcn.com/avatars/02.png' },
    { id: 3, title: '베타 테스트', date: 'Jul - Aug', status: 'pending', user: 'https://ui.shadcn.com/avatars/03.png' },
    { id: 4, title: '글로벌 런칭', date: 'Sep', status: 'pending', user: 'https://ui.shadcn.com/avatars/04.png' },
];

export function Timeline() {
    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <Text tt="uppercase" c="dimmed" fw={700} size="xs" mb="lg">Project Roadmap</Text>

            <div style={{ display: 'flex', gap: 20, position: 'relative', paddingBottom: 20, overflowX: 'auto' }}>
                {/* Continuous Line */}
                <div style={{
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'rgba(255,255,255,0.1)',
                    zIndex: 0
                }} />

                {phases.map((phase, index) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ flex: 1, minWidth: 200, position: 'relative', zIndex: 1 }}
                    >
                        <Group justify="center" mb="xs" style={{ position: 'relative' }}>
                            <div style={{
                                width: 12, height: 12, borderRadius: '50%',
                                background: phase.status === 'done' ? 'var(--mantine-color-teal-6)' : phase.status === 'active' ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-gray-7)',
                                border: '2px solid var(--mantine-color-dark-7)',
                                boxShadow: phase.status === 'active' ? '0 0 10px var(--mantine-color-blue-9)' : 'none',
                                position: 'relative',
                                zIndex: 2
                            }} />
                        </Group>
                        <Paper p="sm" radius="md" bg="dark.6" withBorder style={{ opacity: phase.status === 'pending' ? 0.5 : 1 }}>
                            <Text size="sm" fw={700}>{phase.title}</Text>
                            <Text size="xs" c="dimmed" mb="xs">{phase.date}</Text>
                            <Group>
                                <Tooltip label="Assignee">
                                    <Avatar src={phase.user} size="xs" radius="xl" />
                                </Tooltip>
                            </Group>
                        </Paper>
                    </motion.div>
                ))}
            </div>
        </Paper>
    );
}
