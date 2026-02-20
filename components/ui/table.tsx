import { ReactNode } from 'react';
export const Table = ({ children }: { children: ReactNode }) => <div className='overflow-x-auto rounded-xl border bg-white'><table className='min-w-full text-sm'>{children}</table></div>;
export const Th = ({ children }: { children: ReactNode }) => <th className='border-b px-3 py-2 text-left font-semibold'>{children}</th>;
export const Td = ({ children }: { children: ReactNode }) => <td className='border-b px-3 py-2'>{children}</td>;
