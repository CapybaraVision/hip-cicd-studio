import '@mantine/core/styles.css';
import './globals.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ProjectProvider } from '@/contexts/ProjectContext';

export const metadata = {
  title: 'Hip CI/CD Studio',
  description: 'Clean, Fresh, and Free Project Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <LanguageProvider>
            <ProjectProvider>
              {children}
            </ProjectProvider>
          </LanguageProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
