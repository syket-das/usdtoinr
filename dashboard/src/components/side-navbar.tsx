'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  UsersRound,
  LogOut,
  Wallet,
  IndianRupee,
  LineChart,
} from 'lucide-react';

import { useWindowWidth } from '@react-hook/window-size';

import { Nav } from './ui/nav';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Button } from './ui/button';

type Props = {};

export const SideNavbar = ({}: Props) => {
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const isMobileWdith = onlyWidth < 768;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (pathname === '/login') {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="relative min-w-[80px] border-r px-3 pb-3 pt-24 ">
        {!isMobileWdith && (
          <div className="absolute right-[-20px] top-7">
            <Button
              variant="secondary"
              className="rounded-full p-2"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronRight />
            </Button>
          </div>
        )}

        <Nav
          isCollapsed={isMobileWdith ? true : isCollapsed}
          links={[
            {
              title: 'Dashboard',
              icon: LayoutDashboard,
              variant: 'default',
              href: '/',
            },
            {
              title: 'Users',
              icon: UsersRound,
              variant: 'ghost',
              href: '/users',
            },
            {
              title: 'Add ',
              icon: Wallet,
              variant: 'ghost',
              href: '/add-money',
            },
            {
              title: 'Withdraw ',
              icon: IndianRupee,
              variant: 'ghost',
              href: '/withdraw-money',
            },
            {
              title: 'Rates',
              icon: LineChart,
              variant: 'ghost',
              href: '/exchange-rate',
            },
            {
              title: 'Settings',
              icon: Settings,
              variant: 'ghost',
              href: '/settings',
            },
          ]}
        />
      </div>
    </TooltipProvider>
  );
};
