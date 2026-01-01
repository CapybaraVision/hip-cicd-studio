'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Users, ArrowUpRight, GitCommit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Paper, Title, Group, Text, Badge, ThemeIcon } from '@mantine/core';

const data = [
    { day: 'Mon', active: 1200, new: 400 },
    { day: 'Tue', active: 1900, new: 300 },
    { day: 'Wed', active: 1500, new: 550 },
    { day: 'Thu', active: 2100, new: 700 },
    { day: 'Fri', active: 2800, new: 900 },
    { day: 'Sat', active: 3100, new: 1200 },
    { day: 'Sun', active: 2900, new: 1100 },
];

export function UserGrowthChart() {
    const { t } = useLanguage();

    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Group justify="space-between" mb="lg">
                <Group>
                    <ThemeIcon color="cyan" variant="light" radius="md" size="lg">
                        <Users size={20} />
                    </ThemeIcon>
                    <div>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>{t('title.user_growth')}</Text>
                        <Title order={3}>15,230</Title>
                    </div>
                </Group>
                <Group gap="xs">
                    <Badge variant="outline" color="gray" leftSection={<GitCommit size={12} />}>
                        2 Deploys
                    </Badge>
                    <Badge leftSection={<ArrowUpRight size={12} />} color="cyan" variant="filled">+24%</Badge>
                </Group>
            </Group>

            <div style={{ height: 250, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22b8cf" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22b8cf" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#eebefa" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#eebefa" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1A1B1E', borderColor: 'rgba(255,255,255,0.1)' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="active" stroke="#22b8cf" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" name={t('kpi.active_users')} />
                        <Area type="monotone" dataKey="new" stroke="#eebefa" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" name={t('kpi.new_users')} />

                        {/* Deployment Markers */}
                        <ReferenceLine x="Wed" stroke="#fab005" strokeDasharray="3 3">
                            <Label value="v1.2" position="top" fill="#fab005" fontSize={12} />
                        </ReferenceLine>
                        <ReferenceLine x="Fri" stroke="#fab005" strokeDasharray="3 3">
                            <Label value="v1.3" position="top" fill="#fab005" fontSize={12} />
                        </ReferenceLine>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    );
}
