'use client';

import { Stack, Tooltip, UnstyledButton, rem, Box } from '@mantine/core';
import { Home, Layers, Settings, Activity, Hexagon } from 'lucide-react';
import { useState } from 'react';
import classes from './Sidebar.module.css';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarLinkProps {
    icon: typeof Home;
    label: string;
    link: string;
    active?: boolean;
}

function NavbarLink({ icon: Icon, label, link, active }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                component={Link}
                href={link}
                className={classes.link}
                data-active={active || undefined}
            >
                <Icon style={{ width: rem(22), height: rem(22) }} strokeWidth={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const data = [
    { icon: Home, label: '홈', link: '/' },
    { icon: Layers, label: '프로젝트', link: '/projects' },
    { icon: Activity, label: '파이프라인', link: '/cicd' },
    { icon: Settings, label: '설정', link: '#' },
];

export function Sidebar() {
    const pathname = usePathname();

    const links = data.map((link) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={pathname === link.link}
        />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.wrapper}>
                <div className={classes.logo}>
                    <Hexagon size={30} className={classes.logoIcon} />
                </div>
                <Stack justify="center" gap={10}>
                    {links}
                </Stack>
            </div>
        </nav>
    );
}
