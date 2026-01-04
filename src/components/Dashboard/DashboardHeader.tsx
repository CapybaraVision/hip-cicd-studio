'use client';

import { Group, Title, Text, Badge, Button, SegmentedControl, ThemeIcon } from '@mantine/core';
import { RotateCcw, Download, FileText, Command } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardHeader() {
    const { lang, setLang, t } = useLanguage();

    return (
        <Group justify="space-between" mb="xl" align="center">
            <div>
                <Group mb="xs">
                    <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="lg" radius="sm">
                        {t('header.badge')}
                    </Badge>
                    <SegmentedControl
                        size="xs"
                        radius="sm"
                        value={lang}
                        onChange={(value) => setLang(value as 'ko' | 'en')}
                        data={[
                            { label: '🇰🇷 KO', value: 'ko' },
                            { label: '🇺🇸 EN', value: 'en' },
                        ]}
                    />
                </Group>
                <Group align="center" gap="xs">
                    <ThemeIcon variant="light" size={42} radius="md" color="gray">
                        <Command size={24} />
                    </ThemeIcon>
                    <Title order={1} size={42} style={{
                        fontWeight: 900,
                        letterSpacing: -1,
                        background: 'linear-gradient(45deg, #fff, #999)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {t('header.title')}
                    </Title>
                </Group>

                <Text c="dimmed" size="lg" mt={4}>
                    {t('header.subtitle')}
                </Text>
            </div>
            <Group>
                <Button leftSection={<RotateCcw size={16} />} color="red" variant="light" radius="md" onClick={() => alert('Emergency Rollback triggered!')}>
                    {t('header.rollback')}
                </Button>
                <Button variant="default" leftSection={<FileText size={16} />} radius="md" onClick={() => window.open('/api/export?format=json', '_blank')}>
                    {t('header.reports')}
                </Button>
                <Button variant="filled" color="cyan" leftSection={<Download size={16} />} radius="md" onClick={() => window.open('/api/export?format=csv', '_blank')}>
                    {t('header.export')}
                </Button>
            </Group>
        </Group>
    );
}
