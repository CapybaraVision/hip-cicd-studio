'use client';

import { Paper, Title, Text, Group, Badge } from '@mantine/core';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, ReferenceArea, Cell } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const data = [
    { x: 80, y: 90, z: 200, name: '서버 과부하', type: 'High' },
    { x: 30, y: 40, z: 100, name: 'API 지연', type: 'Low' },
    { x: 60, y: 20, z: 150, name: 'DB 락', type: 'Medium' },
    { x: 90, y: 50, z: 300, name: '보안 취약점', type: 'High' },
    { x: 20, y: 80, z: 120, name: 'UI 버그', type: 'Medium' },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <Paper p="xs" shadow="md" style={{ background: 'rgba(30, 30, 35, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Text size="sm" fw={700} c="white">{data.name}</Text>
                <Text size="xs" c="dimmed">영향도: {data.x}% | 발생가능성: {data.y}%</Text>
            </Paper>
        );
    }
    return null;
};

export function RiskMatrix() {
    return (
        <Paper p="lg" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', height: '100%' }}>
            <Group justify="space-between" mb="lg">
                <Group gap="xs">
                    <AlertTriangle size={20} color="orange" />
                    <Title order={3} size="h4">리스크 매트릭스</Title>
                </Group>
                <Badge color="red" variant="light">위험 감지: 2건</Badge>
            </Group>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <XAxis type="number" dataKey="x" name="Impact" unit="%" tick={{ fill: '#888' }} label={{ value: '영향도', position: 'bottom', fill: '#666', fontSize: 12 }} />
                        <YAxis type="number" dataKey="y" name="Probability" unit="%" tick={{ fill: '#888' }} label={{ value: '발생가능성', angle: -90, position: 'left', fill: '#666', fontSize: 12 }} />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} name="Score" />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                        {/* Zones */}
                        <ReferenceArea x1={50} x2={100} y1={50} y2={100} stroke="none" fill="rgba(255, 0, 0, 0.1)" />
                        <ReferenceArea x1={0} x2={50} y1={0} y2={50} stroke="none" fill="rgba(0, 255, 0, 0.05)" />

                        <Scatter name="Risks" data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.type === 'High' ? '#fa5252' : entry.type === 'Medium' ? '#fab005' : '#40c057'} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </Paper>
    );
}
