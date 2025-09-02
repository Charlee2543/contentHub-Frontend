// lib/validation.ts
import { z } from "zod";

export const registerSchema = z
   .object({
      username: z
         .string()
         .min(6, "Username ต้องมีอย่างน้อย 6 ตัวอักษร")
         .regex(
            /^[A-Za-z0-9]+$/,
            "Username ต้องเป็นภาษาอังกฤษและห้ามมีอักษรพิเศษ"
         ),
      /*       .regex(/[A-Z]/, "Username ต้องมีตัวพิมพ์ใหญ่ อย่างน้อย 1 ตัว") */
      email: z
         .email("รูปแบบอีเมลไม่ถูกต้อง")
         .regex(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Email ต้องเป็นภาษาอังกฤษและห้ามมีอักษรพิเศษนอกเหนือจากที่อนุญาต"
         ),

      password: z
         .string()
         .min(6, "Password ต้องมีอย่างน้อย 6 ตัวอักษร")
         // .regex(/[A-Z]/, "Password ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
         // .regex(/[0-9]/, "Password ต้องมีตัวเลขอย่างน้อย 1 ตัว")
         .regex(/^[A-Za-z0-9]+$/, "Password ห้ามมีอักษรพิเศษ"),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Password และ Confirm Password ต้องตรงกัน",
      path: ["confirmPassword"], // ชี้ error ไปที่ confirmPassword
   });

export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
   email: z
      .email("รูปแบบอีเมลไม่ถูกต้อง")
      .regex(
         /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
         "Email ต้องเป็นภาษาอังกฤษและห้ามมีอักษรพิเศษนอกเหนือจากที่อนุญาต"
      ),

   password: z
      .string()
      .min(6, "Password ต้องมีอย่างน้อย 6 ตัวอักษร")
      // .regex(/[A-Z]/, "Password ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว")
      // .regex(/[0-9]/, "Password ต้องมีตัวเลขอย่างน้อย 1 ตัว")
      .regex(/^[A-Za-z0-9]+$/, "Password ห้ามมีอักษรพิเศษ"),
});

export type loginType = z.infer<typeof loginSchema>;
