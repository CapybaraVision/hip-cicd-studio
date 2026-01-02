'use client';

import { useState, useEffect } from 'react';
import { Title, Text, Group, TextInput, Select, SimpleGrid, Button, Modal, Stack, Loader, Center, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { ProjectCard } from '@/components/Dashboard/ProjectCard';

export function SystemStatus() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectRepo, setNewProjectRepo] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/projects');
            const data = await res.json();
            if (Array.isArray(data)) {
                setProjects(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async () => {
        if (!newProjectName) return;
        setSubmitting(true);
        try {
            await fetch('/api/projects', {
                method: 'POST',
                body: JSON.stringify({ name: newProjectName, repo: newProjectRepo })
            });
            await fetchProjects();
            close();
            setNewProjectName('');
            setNewProjectRepo('');
        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container size="xl" p={0}>
            <Group justify="space-between" mb="xl">
                <div>
                    <Title order={1}>System Status</Title>
                    <Text c="dimmed">Monitor microservices capability and health.</Text>
                </div>
                <Group>
                    <Button variant="subtle" onClick={fetchProjects} leftSection={<RefreshCw size={16} />}>Refresh</Button>
                    <Button leftSection={<Plus size={18} />} variant="gradient" gradient={{ from: 'teal', to: 'lime' }} onClick={open}>Add Service</Button>
                </Group>
            </Group>

            <Group mb="xl">
                <TextInput
                    placeholder="Search services..."
                    leftSection={<Search size={16} />}
                    style={{ flex: 1 }}
                />
                <Select
                    placeholder="Status"
                    data={['All', 'Active', 'Degraded', 'Maintenance']}
                    leftSection={<Filter size={16} />}
                    w={150}
                />
            </Group>

            {loading ? (
                <Center h={300}><Loader /></Center>
            ) : (
                <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.name}
                            description={`Repo: ${project.repo}`}
                            status={project.status}
                            tags={['Service', 'API']}
                            lastDeployed={project.last_deploy}
                        />
                    ))}
                </SimpleGrid>
            )}

            <Modal opened={opened} onClose={close} title="Register New Service" centered>
                <Stack>
                    <TextInput label="Service Name" placeholder="e.g. Auth Service" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} withAsterisk />
                    <TextInput label="Repository" placeholder="e.g. org/repo" value={newProjectRepo} onChange={(e) => setNewProjectRepo(e.target.value)} />
                    <Button onClick={handleCreateProject} loading={submitting} fullWidth mt="md" color="teal">Register Service</Button>
                </Stack>
            </Modal>
        </Container>
    );
}
