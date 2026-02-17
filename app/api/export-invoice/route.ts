import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { requireUser } from '@/lib/server-guards';

export async function POST(req: Request) {
  await requireUser();
  const body = await req.json() as { client: string; kg: number; days: number; rate: number; total: number; paymentType: string; date: string };
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Hisob-kitob');
  ws.addRow(['MUZLATGICH BOSHQARUV']);
  ws.addRow(['Mijoz', body.client]);
  ws.addRow(['kg', body.kg]);
  ws.addRow(['Kun', body.days]);
  ws.addRow(['Kunlik narx', body.rate]);
  ws.addRow(['Umumiy', body.total]);
  ws.addRow(['To\'lov turi', body.paymentType]);
  const buffer = await wb.xlsx.writeBuffer();
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': `attachment; filename=hisob-kitob_${body.client}_${body.date}.xlsx` } });
}
