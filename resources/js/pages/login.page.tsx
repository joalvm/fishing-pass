import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon, GitCompareIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface LoginProps extends ComponentProps<'form'> {
    sidebarOpen?: boolean;
}

const schema = z.object({
    username: z.string().min(1, 'El nombre de usuario es obligatorio'),
    password: z.string().min(1, 'La contraseña es obligatoria'),
    remember_me: z.boolean().default(false),
});

export default function Login({ className, sidebarOpen, ...props }: LoginProps) {
    const [visible, setVisible] = useState(false);

    const form = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
            remember_me: false,
        },
    });

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const onSubmit = (data: z.infer<typeof schema>) => {
        router.post('login', data, {
            onFinish: () => form.reset(),
            preserveScroll: true,
            preserveState: true,
            onError: (errors) => {
                if (errors.username) {
                    form.setError('username', { type: 'manual', message: errors.username });
                }
                if (errors.password) {
                    form.setError('password', { type: 'manual', message: errors.password });
                }
            },
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <AuthLayout title="FISHING PASS" description="Inicia sesión en tu cuenta para continuar" className="w-full max-w-xs">
            <Head title="Iniciar sesión" />
            <Form {...form}>
                <form className={cn('flex flex-col gap-6', className)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
                    <div className="flex flex-col items-center gap-2 text-center"></div>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Usuario *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                autoFocus
                                                {...field}
                                                disabled={form.formState.isSubmitting}
                                                className={cn(
                                                    fieldState.error &&
                                                        'border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive',
                                                )}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <Label className={cn(fieldState.error && 'text-destructive')}>Contraseña *</Label>
                                            <a href="#" aria-disabled className="ml-auto text-sm underline-offset-4 hover:underline">
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </div>
                                        <FormControl>
                                            <div className="relative flex items-center">
                                                <Input
                                                    type={visible ? 'text' : 'password'}
                                                    className={cn(
                                                        '[&::-ms-reveal]:hidden',
                                                        fieldState.error &&
                                                            'border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive',
                                                    )}
                                                    {...field}
                                                    disabled={form.formState.isSubmitting}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        'hover:bg-input-hover focus:bg-input-focus absolute top-1/2 right-0.5 z-20 -translate-y-1/2',
                                                        fieldState.error && 'text-destructive',
                                                    )}
                                                    onClick={toggleVisibility}
                                                >
                                                    {!visible ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-3">
                            <FormField
                                control={form.control}
                                name="remember_me"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Switch
                                                {...field}
                                                value={field.value ? 'on' : 'off'}
                                                onCheckedChange={(chk) => {
                                                    form.setValue('remember_me', chk);
                                                }}
                                            />
                                        </FormControl>
                                        <Label>Recuérdame</Label>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Acceder
                        </Button>
                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                            <span className="relative z-10 bg-background px-2 text-muted-foreground">O Registra tu empresa</span>
                        </div>
                        <Button type="button" asChild variant="outline" className="w-full">
                            <Link href="/register">
                                <GitCompareIcon className="mr-2 h-4 w-4" />
                                Registrar
                            </Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    );
}
