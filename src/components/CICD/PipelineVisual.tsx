import { useState, useEffect } from 'react';
import { Paper, Text, Group, ThemeIcon, Stack, RingProgress, Center, Loader, Alert } from '@mantine/core';
import { GitCommit, Package, TestTube, Rocket, Check, AlertCircle, Info } from 'lucide-react';
import { useProject } from '@/contexts/ProjectContext';

export function PipelineVisual() {
    const { selectedProject } = useProject();
    const [pipelineData, setPipelineData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPipeline = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/pipeline');
                const data = await res.json();
                setPipelineData(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchPipeline();
    }, []);

    // Filter by selected project, or take the absolute latest if none selected
    const latestBuild = pipelineData
        .filter(item => !selectedProject || item.service_id === selectedProject.name || item.service_id === selectedProject.id) // relaxed matching
        .sort((a, b) => {
            // quick sort by time approx (time is string like '10m ago') - properly we need parsed date but for MVP just take first
            return 0;
        })[0];

    // Helper to determine step status based on overall build status
    const getStepStatus = (stepIndex: number, overallStatus: string) => {
        if (!overallStatus) return 'pending';
        const s = overallStatus.toLowerCase();

        if (s === 'success') return 'completed';
        if (s === 'failed') {
            // Assume failure happens at Build (step 1) or Test (step 2) for demo
            if (stepIndex <= 1) return 'completed'; // Source always done
            if (stepIndex === 2) return 'failed'; // Failed at Build
            return 'pending';
        }
        if (s === 'building') {
            if (stepIndex === 0) return 'completed';
            if (stepIndex === 1) return 'processing';
            return 'pending';
        }
        return 'pending';
    };

    if (loading) return <Center p="xl"><Loader /></Center>;

    if (!latestBuild) {
        return (
            <Paper withBorder p="xl" radius="md" mb="xl" bg="dark.8">
                <Text size="lg" fw={700} mb="xl">Deployment Pipeline</Text>
                <Alert icon={<Info size={16} />} color="blue">
                    {selectedProject ? `No pipeline history found for ${selectedProject.name}` : 'Select a project to view pipeline status'}
                </Alert>
            </Paper>
        );
    }

    const status = latestBuild.status;

    return (
        <Paper withBorder p="xl" radius="md" mb="xl" bg="dark.8">
            <Group justify="space-between" mb="xl">
                <Text size="lg" fw={700}>Current Deployment Pipeline</Text>
                <Group gap="xs">
                    <Text size="sm" c="dimmed">latest: {latestBuild.version}</Text>
                    <Text size="sm" fw={500} c={status === 'Success' ? 'teal' : status === 'Failed' ? 'red' : 'yellow'}>{status}</Text>
                </Group>
            </Group>

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
                    status={getStepStatus(1, status)}
                    color={status === 'Failed' ? 'red' : 'teal'}
                />
                <Connector status={getStepStatus(1, status) === 'completed' ? 'completed' : 'pending'} />

                {/* Step 3: Test */}
                <PipelineStep
                    icon={<TestTube size={20} />}
                    label="Test"
                    status={getStepStatus(2, status)}
                    color={status === 'Failed' ? 'red' : 'blue'}
                />
                <Connector status={getStepStatus(2, status) === 'completed' ? 'completed' : 'pending'} />

                {/* Step 4: Deploy */}
                <PipelineStep
                    icon={<Rocket size={20} />}
                    label="Deploy"
                    status={getStepStatus(3, status)}
                    color={status === 'Failed' ? 'red' : 'green'}
                />
            </Group>

            {status === 'Building' && (
                <Paper mt="xl" p="md" radius="sm" bg="dark.9" withBorder style={{ borderColor: '#333' }}>
                    <Group gap="sm">
                        <Loader size={16} color="blue" />
                        <Text size="sm" c="dimmed">Pipeline executing... Triggered by {latestBuild.trigger}</Text>
                    </Group>
                </Paper>
            )}
        </Paper>
    );
}

function PipelineStep({ icon, label, status, color }: { icon: any, label: string, status: 'completed' | 'processing' | 'pending' | 'failed', color: string }) {
    const isProcessing = status === 'processing';
    const isCompleted = status === 'completed';
    const isFailed = status === 'failed';

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
                {isFailed && (
                    <ThemeIcon
                        size={18}
                        radius="xl"
                        color="red"
                        style={{ position: 'absolute', bottom: -2, right: -2, border: '2px solid #1A1B1E' }}
                    >
                        <AlertCircle size={10} />
                    </ThemeIcon>
                )}
            </div>
            <Text size="sm" fw={500} c={status === 'pending' ? 'dimmed' : 'white'}>{label}</Text>
        </Stack>
    );
}

function Connector({ status }: { status: 'completed' | 'processing' | 'pending' | 'failed' }) {
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
