'use client';

import { useState, useEffect } from 'react';
import { Paper, Title, Text, Group, ThemeIcon, Stack, Table, Badge, Loader, Center, Button, Drawer, Timeline, ActionIcon, List, Alert } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GitCommit, Package, TestTube, Rocket, CheckCircle2, XCircle, Clock, RefreshCw, AlertTriangle, RotateCcw, Play, ExternalLink } from 'lucide-react';
import { PipelineVisual } from './PipelineVisual';

export function Pipeline() {
    const [pipelines, setPipelines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedBuild, setSelectedBuild] = useState<any>(null);

    const fetchPipelines = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/pipeline');
            const data = await res.json();
            if (Array.isArray(data)) {
                setPipelines(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPipelines();
    }, []);

    const handleRowClick = (row: any) => {
        setSelectedBuild(row);
        open();
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success': return 'teal';
            case 'failed': return 'red';
            case 'building': return 'blue';
            default: return 'gray';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success': return <CheckCircle2 size={16} />;
            case 'failed': return <XCircle size={16} />;
            case 'building': return <Loader size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <Stack gap="xl">
            <Group justify="space-between">
                <div>
                    <Title order={3}>Release Command Center</Title>
                    <Text c="dimmed" size="sm">Manage deployments, rollback, and trace feature release.</Text>
                </div>
                <Button variant="light" leftSection={<RefreshCw size={16} />} onClick={fetchPipelines}>Refresh</Button>
            </Group>

            <PipelineVisual />

            {loading ? (
                <Center h={200}><Loader /></Center>
            ) : (
                <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                    <Table verticalSpacing="sm" highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Build ID</Table.Th>
                                <Table.Th>Service</Table.Th>
                                <Table.Th>Version</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Features</Table.Th>
                                <Table.Th>Author</Table.Th>
                                <Table.Th>Time</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {pipelines.map((row) => (
                                <Table.Tr key={row.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(row)}>
                                    <Table.Td><Text fz="sm" fw={700} c="brand">{row.id}</Text></Table.Td>
                                    <Table.Td><Badge variant="light" color="gray">{row.service_id}</Badge></Table.Td>
                                    <Table.Td><Text fz="sm" ff="monospace">{row.version}</Text></Table.Td>
                                    <Table.Td>
                                        <Badge
                                            color={getStatusColor(row.status)}
                                            variant="light"
                                            leftSection={getStatusIcon(row.status)}
                                        >
                                            {row.status}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        {row.features ? (
                                            <Group gap={5}>
                                                <GitCommit size={14} />
                                                <Text size="xs">{row.features.split(',').length} features</Text>
                                            </Group>
                                        ) : <Text size="xs" c="dimmed">-</Text>}
                                    </Table.Td>
                                    <Table.Td><Text fz="sm" c="dimmed">@{row.author}</Text></Table.Td>
                                    <Table.Td><Text fz="sm" c="dimmed">{row.time}</Text></Table.Td>
                                    <Table.Td>
                                        <Button size="xs" variant="default" onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}>Manage</Button>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Paper>
            )}

            <Drawer position="right" size="md" opened={opened} onClose={close} title={<Title order={4}>Deployment Details: {selectedBuild?.id}</Title>}>
                {selectedBuild && (
                    <Stack gap="lg">
                        <Paper withBorder p="md" radius="md" bg="dark.8">
                            <Group justify="space-between" mb="xs">
                                <Text fw={700} size="lg">{selectedBuild.service_id} <span style={{ fontWeight: 400 }}>v{selectedBuild.version}</span></Text>
                                <Badge size="lg" color={getStatusColor(selectedBuild.status)}>{selectedBuild.status}</Badge>
                            </Group>
                            <Text size="sm" c="dimmed">Triggered via {selectedBuild.trigger} by @{selectedBuild.author}</Text>
                        </Paper>

                        <div>
                            <Text fw={700} mb="sm">Included Features (Traceability)</Text>
                            {selectedBuild.features ? (
                                <Stack gap="xs">
                                    {selectedBuild.features.split(',').map((feat: string) => (
                                        <Paper key={feat} withBorder p="sm" radius="sm">
                                            <Group justify="space-between">
                                                <Group gap="xs">
                                                    <ExternalLink size={14} />
                                                    <Text size="sm">{feat.trim()}</Text>
                                                </Group>
                                                <Badge size="xs" color="gray">Done</Badge>
                                            </Group>
                                        </Paper>
                                    ))}
                                </Stack>
                            ) : (
                                <Alert color="gray" icon={<AlertTriangle size={16} />}>No features linked to this build.</Alert>
                            )}
                        </div>

                        <div>
                            <Text fw={700} mb="sm">Deployment Timeline</Text>
                            <Timeline active={selectedBuild.status === 'Success' ? 3 : 1} bulletSize={24} lineWidth={2}>
                                <Timeline.Item bullet={<GitCommit size={12} />} title="Code Checkout">
                                    <Text c="dimmed" size="xs">Pulled from main branch</Text>
                                </Timeline.Item>
                                <Timeline.Item bullet={<Package size={12} />} title="Build Image">
                                    <Text c="dimmed" size="xs">Docker build completed</Text>
                                </Timeline.Item>
                                <Timeline.Item bullet={<TestTube size={12} />} title="Unit Tests">
                                    <Text c="dimmed" size="xs">Passed 142 tests</Text>
                                </Timeline.Item>
                                <Timeline.Item bullet={<Rocket size={12} />} title="Deploy to Cluster">
                                    <Text c="dimmed" size="xs">Helm chart updated</Text>
                                </Timeline.Item>
                            </Timeline>
                        </div>

                        <Paper withBorder p="md" radius="md" mt="auto">
                            <Text fw={700} mb="md">Release Actions</Text>
                            <Group grow>
                                <Button color="red" leftSection={<RotateCcw size={16} />} variant="light">Rollback v{selectedBuild.version}</Button>
                                <Button color="blue" leftSection={<Play size={16} />} variant="light">Re-deploy</Button>
                            </Group>
                        </Paper>
                    </Stack>
                )}
            </Drawer>
        </Stack>
    );
}
