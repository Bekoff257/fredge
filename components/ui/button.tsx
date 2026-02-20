import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'destructive' };

export function Button({ className, variant = 'default', ...props }: Props) {
  return <button className={cn('rounded-md px-4 py-2 text-sm font-medium disabled:opacity-60', variant === 'default' && 'bg-slate-900 text-white', variant === 'outline' && 'border border-slate-200 bg-white', variant === 'destructive' && 'bg-red-600 text-white', className)} {...props} />;
}
