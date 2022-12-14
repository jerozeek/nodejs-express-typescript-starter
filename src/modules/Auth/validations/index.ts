import { z } from 'zod';

const loginValidationSchema = z.object({
    email: z.string().email('Email is not valid'),
    password: z.string().min(6,'Password must be at least 6 characters'),
    deviceId: z.string().min(6, 'Device ID is required'),
    deviceType: z.string().min(3,'Device type is required'),
});

const registerValidationSchema = z.object({
    email: z.string().email('Invalid email').trim(),
    password: z.string().min(6,'Password must be at least 6 characters'),
    firstname: z.string().min(3,'Firstname is required'),
    lastname: z.string().min(3,'Lastname is required'),
    phone: z.string().min(10,'Phone number is required'),
    deviceId: z.string().min(6, 'Device ID is required'),
    deviceType: z.string().min(3,'Device type is required'),
});

const forgotPasswordValidationSchema = z.object({
    email: z.string().email('Invalid email').optional(),
    phone: z.string().min(11,'Phone number is required').optional(),
    accountNumber: z.string().min(10,'Account number is required').optional(),
});

const resetPasswordValidationSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6,'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6,'Password must be at least 6 characters'),
});

const otpVerificationValidationSchema = z.object({
    email: z.string().email('Invalid email'),
    otp: z.string().min(4,'OTP must be at least 4 characters'),
    type: z.enum(['password_reset', 'account_verification']),
})

export = {
    loginValidationSchema,
    registerValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema,
    otpVerificationValidationSchema
}

