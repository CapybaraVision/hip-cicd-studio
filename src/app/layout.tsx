import '@mantine/core/styles.css';
import './globals.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import { LanguageProvider } from '@/contexts/LanguageContext';

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
            {children}
          </LanguageProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
