import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { AppShell } from '@/components/layout/app-shell';

export default function AppLayout({ children }: { children: ReactNode }) {
  if (!cookies().get('session')?.value) redirect('/login');
  return <AppShell>{children}</AppShell>;
}
