import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-xl bg-sky-600 px-4 py-2 text-white disabled:opacity-60', className)} {...props} />;
}
