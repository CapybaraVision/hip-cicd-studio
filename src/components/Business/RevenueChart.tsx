'use client';

import { Paper, Title, Group, Text, Badge, Select, ThemeIcon } from '@mantine/core';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';

const data = [
    { month: 'Jan', revenue: 4000, cost: 2400 },
    { month: 'Feb', revenue: 3000, cost: 1398 },
    { month: 'Mar', revenue: 2000, cost: 9800 },
    { month: 'Apr', revenue: 2780, cost: 3908 },
    { month: 'May', revenue: 1890, cost: 4800 },
    { month: 'Jun', revenue: 2390, cost: 3800 },
    { month: 'Jul', revenue: 3490, cost: 4300 },
];

export function RevenueChart() {
    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Group justify="space-between" mb="lg">
                <Group>
                    <ThemeIcon color="teal" variant="light" radius="md" size="lg">
                        <DollarSign size={20} />
                    </ThemeIcon>
                    <div>
                        <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Revenue</Text>
                        <Title order={3}>₩124,500,000</Title>
                    </div>
                </Group>
                <Badge leftSection={<TrendingUp size={12} />} color="teal" variant="light">+12.5%</Badge>
            </Group>

            <div style={{ height: 250, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#12b886" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#12b886" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fa5252" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#fa5252" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1A1B1E', borderColor: 'rgba(255,255,255,0.1)' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#12b886" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        <Area type="monotone" dataKey="cost" stroke="#fa5252" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    );
}
