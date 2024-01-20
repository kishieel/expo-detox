import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const useSignInForm = () => {
    return useForm<SignInFormSchema>({ resolver: zodResolver(SignInFormSchema) });
};

export const SignInFormSchema = z.object({
    email: z.string({ required_error: 'Email is required.' }).email('Email is invalid.'),
    password: z.string({ required_error: 'Password is required.' }),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SignInFormSchema = z.infer<typeof SignInFormSchema>;
