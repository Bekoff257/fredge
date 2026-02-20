import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { requireUser } from '@/lib/server-auth';
import { dbConnect } from '@/lib/db';
import Archive from '@/models/Archive';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await requireUser(); await dbConnect();
  const item = await Archive.findById(params.id);
  const wb = new ExcelJS.Workbook(); const ws = wb.addWorksheet('Invoice');
  ws.addRow(['Client', `${item.firstName} ${item.lastName}`]); ws.addRow(['Total', item.totalSom]); ws.addRow(['Days', item.daysStored]);
  const buffer = await wb.xlsx.writeBuffer();
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': 'attachment; filename=invoice.xlsx' } });
}
