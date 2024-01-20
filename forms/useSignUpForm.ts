import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useSignUpForm = () => {
    return useForm<SignUpFormSchema>({ resolver: zodResolver(SignUpFormSchema) });
};

export const SignUpFormSchema = z
    .object({
        nickname: z
            .string({ required_error: 'Nickname is required.' })
            .min(3, 'Nickname must contains at least 3 characters.')
            .max(20, 'Nickname must not be longer than 20 characters.'),
        email: z.string({ required_error: 'Email is required.' }).email('Email is invalid.'),
        password: z
            .string({ required_error: 'Password is required.' })
            .min(8, 'Password must contains at least 8 characters.')
            .regex(/\p{Lu}+/u, 'Password must contains at least one uppercase letter.')
            .regex(/\p{Ll}+/u, 'Password must contains at least one lowercase letter.')
            .regex(/\d+/, 'Password must contains at least one number.'),
        confirm: z.string({ required_error: 'Password confirmation is required.' }),
        terms: z.literal(true, { errorMap: () => ({ message: 'Term of use agreement is required.' }) }),
        newsletter: z.boolean().optional(),
    })
    .refine((data) => data.password === data.confirm, {
        message: 'Password confirmation does not match.',
        path: ['confirm'],
    });

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;
