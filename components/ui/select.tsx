import { SelectHTMLAttributes } from 'react';
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="w-full rounded-xl border border-slate-200 px-3 py-2" />;
}
