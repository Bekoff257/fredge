import { z } from 'zod';

export const clientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(5),
  productName: z.string().min(1),
  productTypeId: z.string().min(1),
  quantityKg: z.coerce.number().positive(),
  roomId: z.string().min(1),
  containerType: z.enum(['YASHIK', 'QOP', 'KARZINKA']),
  containerCount: z.coerce.number().int().min(1),
  entryDate: z.string(),
  note: z.string().optional().default('')
});

export const finalizeSchema = z.object({ dailyRateSomPerKg: z.coerce.number().positive(), exitDate: z.string(), paymentType: z.enum(['CASH','DEBT']) });
export const debtPaymentSchema = z.object({ amountSom: z.coerce.number().positive(), note: z.string().default('') });
