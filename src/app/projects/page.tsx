'use client';

import { Container, Title, Text, Group, TextInput, Select, SimpleGrid, Button, Badge, Paper, ActionIcon, ThemeIcon } from '@mantine/core';
import { Search, Filter, Plus, MoreHorizontal, FolderGit2 } from 'lucide-react';
import { Sidebar } from '@/components/Layout/Sidebar';

const projects = [
    { id: 1, name: 'Neon Ecommerce', status: 'In Progress', type: 'Web App', lead: 'Alice', tasks: 12 },
    { id: 2, name: 'Zen Portfolio', status: 'Live', type: 'Website', lead: 'Bob', tasks: 0 },
    { id: 3, name: 'Crypto Dashboard', status: 'Risk', type: 'Dashboard', lead: 'Charlie', tasks: 4 },
    { id: 4, name: 'Social Feed App', status: 'Live', type: 'Mobile', lead: 'Alice', tasks: 2 },
    { id: 5, name: 'Internal Tools', status: 'In Progress', type: 'Internal', lead: 'Dave', tasks: 8 },
];

export default function ProjectsPage() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, marginLeft: 80, minHeight: '100vh', padding: '2rem' }}>
                <Container size="xl">
                    <Group justify="space-between" mb="xl">
                        <div>
                            <Title order={1}>Projects</Title>
                            <Text c="dimmed">Manage all your active workspaces.</Text>
                        </div>
                        <Button leftSection={<Plus size={18} />} variant="gradient" gradient={{ from: 'brand', to: 'cyan' }}>New Project</Button>
                    </Group>

                    <Group mb="xl">
                        <TextInput
                            placeholder="Search projects..."
                            leftSection={<Search size={16} />}
                            style={{ flex: 1 }}
                        />
                        <Select
                            placeholder="Status"
                            data={['All', 'Live', 'In Progress', 'Risk']}
                            leftSection={<Filter size={16} />}
                            w={150}
                        />
                    </Group>

                    <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                        {projects.map((project) => (
                            <Paper key={project.id} p="lg" radius="md" withBorder style={{
                                background: 'rgba(255,255,255,0.03)',
                                borderColor: 'rgba(255,255,255,0.05)',
                                transition: 'transform 0.2s',
                            }}>
                                <Group justify="space-between" mb="md">
                                    <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                                        <FolderGit2 size={20} />
                                    </ThemeIcon>
                                    <ActionIcon variant="subtle" color="gray">
                                        <MoreHorizontal size={18} />
                                    </ActionIcon>
                                </Group>

                                <Title order={3} size="h4" mb={5}>{project.name}</Title>
                                <Text size="sm" c="dimmed" mb="md">{project.type} • Lead by {project.lead}</Text>

                                <Group justify="space-between" align="center" mt="auto">
                                    <Badge
                                        variant="dot"
                                        color={project.status === 'Live' ? 'teal' : project.status === 'Risk' ? 'red' : 'blue'}
                                    >
                                        {project.status}
                                    </Badge>
                                    <Text size="xs" c="dimmed">{project.tasks} active tasks</Text>
                                </Group>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Container>
            </main>
        </div>
    );
}
