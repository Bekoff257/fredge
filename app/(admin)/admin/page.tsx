import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/server-auth';
export default async function AdminPage() { try { await requireAdmin(); } catch { redirect('/'); } return <div className='rounded-xl border bg-white p-6'>Hidden admin dashboard</div>; }
