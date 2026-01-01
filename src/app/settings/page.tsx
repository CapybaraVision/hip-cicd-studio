'use client';

import { Title, Paper, Switch, Group, Text, Stack, Button, TextInput, Select, Divider, Badge } from '@mantine/core';
import { Moon, Sun, Globe, Webhook, Download, Database } from 'lucide-react';
import { useMantineColorScheme } from '@mantine/core';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SettingsPage() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();

    return (
        <Stack gap="xl" p="md">
            <Title order={2}>Studio Settings</Title>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">General</Title>
                <Stack gap="lg">
                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="gray"><Moon size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>Dark Mode</Text>
                                <Text size="sm" c="dimmed">Toggle between light and dark theme</Text>
                            </div>
                        </Group>
                        <Switch
                            checked={colorScheme === 'dark'}
                            onChange={() => toggleColorScheme()}
                            size="md"
                            onLabel={<Moon size={14} />}
                            offLabel={<Sun size={14} />}
                        />
                    </Group>
                    <Divider />
                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="blue"><Globe size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>Language</Text>
                                <Text size="sm" c="dimmed">Select your preferred interface language</Text>
                            </div>
                        </Group>
                        <Select
                            value={lang}
                            onChange={(val) => setLang(val as 'ko' | 'en')}
                            data={[
                                { value: 'ko', label: '한국어 (Korean)' },
                                { value: 'en', label: 'English' }
                            ]}
                        />
                    </Group>
                </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Integrations</Title>
                <Stack gap="lg">
                    <Group justify="space-between" align="start">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="grape"><Webhook size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>Incoming Webhook</Text>
                                <Text size="sm" c="dimmed">Trigger pipeline deployments via URL</Text>
                            </div>
                        </Group>
                        <Badge color="teal" variant="light">Active</Badge>
                    </Group>
                    <TextInput
                        description="Send a POST request to this URL to trigger a deployment."
                        placeholder="https://api.cycle.io/hooks/deployment/..."
                        readOnly
                        value="https://hip-cicd.verel.app/api/webhooks/deploy"
                        rightSection={<Button variant="subtle" size="xs">Copy</Button>}
                    />
                </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Data Management</Title>
                <Stack gap="lg">
                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="green"><Database size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>Export Data</Text>
                                <Text size="sm" c="dimmed">Download all data as JSON/CSV backup</Text>
                            </div>
                        </Group>
                        <Group>
                            <Button variant="outline" leftSection={<Download size={16} />} disabled>Export CSV</Button>
                            <Button variant="light" leftSection={<Download size={16} />} onClick={() => window.open('/api/export?format=json', '_blank')}>Export JSON</Button>
                        </Group>
                    </Group>
                </Stack>
            </Paper>
        </Stack>
    );
}

function ThemeIcon({ children, ...props }: any) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, background: 'var(--mantine-color-body)' }} {...props}>{children}</div>
}
