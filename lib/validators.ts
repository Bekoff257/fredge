import { z } from 'zod';

export const clientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(7),
  productName: z.string().min(1),
  productType: z.string().min(1),
  quantityKg: z.number().positive(),
  room: z.string().min(1),
  containerType: z.enum(['Yashik', 'Qop', 'Karzinka']),
  containerCount: z.number().int().positive(),
  entryDate: z.string(),
  note: z.string().optional()
});

export const finalizeSchema = z.object({
  clientId: z.string(),
  dailyRateSomPerKg: z.number().positive(),
  exitDate: z.string(),
  paymentType: z.enum(['cash', 'debt'])
});
