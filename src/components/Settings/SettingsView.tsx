'use client';

import { Title, Paper, Switch, Group, Text, Stack, Button, TextInput, Select, Divider, Badge } from '@mantine/core';
import { Moon, Sun, Globe, Webhook, Download, Database, FileText } from 'lucide-react';
import { useMantineColorScheme } from '@mantine/core';
import { useLanguage } from '@/contexts/LanguageContext';

export function SettingsView() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const { lang, setLang } = useLanguage();

    return (
        <Stack gap="xl">
            <Title order={3}>Settings & Reports</Title>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Reports & Data Export</Title>
                <Stack gap="lg">
                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="green"><FileText size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>System Report</Text>
                                <Text size="sm" c="dimmed">Download full system audit logs and metrics</Text>
                            </div>
                        </Group>
                        <Group>
                            <Button variant="outline" leftSection={<Download size={16} />} onClick={() => window.open('/api/export?format=csv', '_blank')}>Export CSV</Button>
                            <Button variant="light" leftSection={<Download size={16} />} onClick={() => window.open('/api/export?format=json', '_blank')}>Export JSON</Button>
                        </Group>
                    </Group>
                </Stack>
            </Paper>

            <Paper p="xl" radius="md" withBorder>
                <Title order={4} mb="md">Configuration</Title>
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
                        readOnly
                        value="https://hip-cicd.verel.app/api/webhooks/deploy"
                        rightSection={<Button variant="subtle" size="xs">Copy</Button>}
                    />

                    <Divider />

                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="gray"><Moon size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>Appearance</Text>
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

                    <Group justify="space-between">
                        <Group>
                            <ThemeIcon size="lg" variant="light" color="blue"><Globe size={20} /></ThemeIcon>
                            <div>
                                <Text fw={500}>Language</Text>
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
        </Stack>
    );
}

function ThemeIcon({ children, ...props }: any) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, background: 'var(--mantine-color-body)' }} {...props}>{children}</div>
}
