import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long")
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

export const createEnergyRecordSchema = z.object({
  type: z.enum(['electricity', 'gas', 'water']),
  amount: z.number().nonnegative("Amount must be non-negative"),
  unit: z.string().min(1, "Unit is required"),
  period_start: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date" }),
  period_end: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date" }),
  cost: z.number().nonnegative("Cost must be non-negative").default(0)
}).refine((data) => new Date(data.period_start) <= new Date(data.period_end), {
  message: "period_start must be before or equal to period_end",
  path: ["period_end"]
});

export const analyzeRecordSchema = z.object({
  record_id: z.string().uuid("Invalid record ID")
});

// AI output validation schema
export const aiAnalysisSchema = z.object({
  summary: z.string(),
  findings: z.array(z.object({
    title: z.string(),
    description: z.string(),
    severity: z.enum(['low', 'medium', 'high'])
  })),
  recommendations: z.array(z.object({
    title: z.string(),
    action: z.string(),
    reason: z.string(),
    priority: z.enum(['low', 'medium', 'high'])
  }))
});
