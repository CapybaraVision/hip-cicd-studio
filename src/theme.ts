'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
    primaryColor: 'violet',
    defaultRadius: 'lg',
    white: '#f8f9fa',
    black: '#1a1b1e',
    colors: {
        // Custom "Hip" palette - Neon/Pastel accents
        brand: [
            '#f3f0ff',
            '#e5dbff',
            '#d0bfff',
            '#b197fc',
            '#9775fa',
            '#845ef7',
            '#7950f2',
            '#7048e8',
            '#6741d9',
            '#5f3dc4',
        ],
        accent: [
            '#e3fafc',
            '#c5f6fa',
            '#99e9f2',
            '#66d9e8',
            '#3bc9db',
            '#22b8cf',
            '#15aabf',
            '#1098ad',
            '#0c8599',
            '#0b7285',
        ],
    },
    components: {
        Button: {
            defaultProps: {
                variant: 'light',
            },
        },
        Card: {
            defaultProps: {
                radius: 'lg',
            },
        },
    },
});
