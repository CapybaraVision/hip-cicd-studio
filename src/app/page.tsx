'use client';

import { AppShell, Title, Text, SimpleGrid, Group, Button, Container, ThemeIcon, Tabs, Stack, Grid } from '@mantine/core';
import { Sidebar } from '@/components/Layout/Sidebar';
import { SettingsView } from '@/components/Settings/SettingsView';
import { Activity, Server, GitBranch, Kanban as KanbanIcon, MessageSquare, Settings } from 'lucide-react';
import { ProjectCard } from '@/components/Dashboard/ProjectCard';
import { KanbanBoard } from '@/components/Project/KanbanBoard';
import { PulseFeed } from '@/components/Dashboard/PulseFeed';
import { Pipeline } from '@/components/CICD/Pipeline';
import { UserGrowthChart } from '@/components/Business/UserGrowthChart';
import { DeploymentROICard } from '@/components/Dashboard/DeploymentROICard';
import { VoCPipeline } from '@/components/Business/VoCPipeline';
import { ProductHealthWidget } from '@/components/Business/ProductHealthWidget';
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import { Timeline } from '@/components/Project/Timeline';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { Box, Paper } from '@mantine/core';
import { useLanguage } from '@/contexts/LanguageContext';
import { SystemStatus } from '@/components/Dashboard/SystemStatus';

// ... existing projects data ... -> removal since not used anymore if fetching from API
const projects = [];

export default function Home() {
  const { t } = useLanguage();

  return (
    <ProjectProvider>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, marginLeft: 80, minHeight: '100vh', padding: '2rem' }}>
          <Container size="xl">
            <DashboardHeader />

            <Tabs defaultValue="pulse" variant="pills" radius="md" color="dark" mb="xl">
              <Tabs.List mb="xl">
                <Tabs.Tab value="pulse" leftSection={<Activity size={16} />}>Pulse (Live)</Tabs.Tab>
                <Tabs.Tab value="status" leftSection={<Server size={16} />}>System Status</Tabs.Tab>
                <Tabs.Tab value="cicd" leftSection={<GitBranch size={16} />}>CICD</Tabs.Tab>
                <Tabs.Tab value="sprint" leftSection={<KanbanIcon size={16} />}>Sprint</Tabs.Tab>
                <Tabs.Tab value="voc" leftSection={<MessageSquare size={16} />}>VoC</Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<Settings size={16} />}>Settings & Reports</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="pulse">
                {/* KPI Grid */}
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="xl">
                  <Paper p="md" radius="md" bg="var(--mantine-color-dark-6)" withBorder>
                    <Text size="xs" c="dimmed" fw={700} tt="uppercase">{t('kpi.active_users')}</Text>
                    <Group align="flex-end" gap="xs">
                      <Title order={2}>2,405</Title>
                      <Text c="teal" size="sm" fw={700}>+124 {t('kpi.today')}</Text>
                    </Group>
                  </Paper>
                  <Paper p="md" radius="md" bg="var(--mantine-color-dark-6)" withBorder>
                    <Text size="xs" c="dimmed" fw={700} tt="uppercase">{t('kpi.conversion')}</Text>
                    <Group align="flex-end" gap="xs">
                      <Title order={2}>3.8%</Title>
                      <Text c="teal" size="sm" fw={700}>+0.4%</Text>
                    </Group>
                  </Paper>
                  <Paper p="md" radius="md" bg="var(--mantine-color-dark-6)" withBorder>
                    <Text size="xs" c="dimmed" fw={700} tt="uppercase">{t('kpi.retention')}</Text>
                    <Group align="flex-end" gap="xs">
                      <Title order={2}>85%</Title>
                      <Text c="gray" size="sm" fw={700}>-0.2%</Text>
                    </Group>
                  </Paper>
                  <Paper p="md" radius="md" bg="var(--mantine-color-dark-6)" withBorder>
                    <Text size="xs" c="dimmed" fw={700} tt="uppercase">{t('kpi.system_health')}</Text>
                    <Group align="flex-end" gap="xs">
                      <Title order={2} c="teal">99.9%</Title>
                      <Text c="dimmed" size="sm">{t('kpi.stable')}</Text>
                    </Group>
                  </Paper>
                </SimpleGrid>

                {/* Impact Analysis (ROI Card) */}
                <Box mb="xl">
                  <DeploymentROICard />
                </Box>

                {/* Main Content Grid */}
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mb="xl">
                  {/* Revenue Chart - Takes 2 columns */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <UserGrowthChart />
                  </div>
                  {/* Pulse Feed - Takes 1 column */}
                  <div>
                    <PulseFeed />
                  </div>
                </SimpleGrid>

                {/* Intelligence Grid (VoC & PHI) */}
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mb="xl">
                  {/* PHI Widget - Takes 1 column */}
                  <div>
                    <ProductHealthWidget />
                  </div>
                  {/* VoC Pipeline - Takes 2 columns */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <VoCPipeline />
                  </div>
                </SimpleGrid>
              </Tabs.Panel>

              <Tabs.Panel value="status">
                <SystemStatus />
              </Tabs.Panel>

              <Tabs.Panel value="cicd">
                <Pipeline />
              </Tabs.Panel>

              <Tabs.Panel value="sprint">
                <KanbanBoard />
              </Tabs.Panel>

              <Tabs.Panel value="voc">
                <VoCPipeline />
              </Tabs.Panel>

              <Tabs.Panel value="settings">
                <SettingsView />
              </Tabs.Panel>
            </Tabs>

          </Container>
        </main>
      </div>
    </ProjectProvider>
  );
}
