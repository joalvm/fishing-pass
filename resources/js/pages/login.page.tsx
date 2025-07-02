import InputError from '@/components/input-error';
import InputPassword from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { Head, Link, useForm } from '@inertiajs/react';
import { GitCompareIcon, LoaderCircleIcon } from 'lucide-react';
import { ComponentProps, FormEventHandler } from 'react';

interface LoginProps extends ComponentProps<'form'> {
    status?: string;
    canResetPassword?: boolean;
}

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Login({ status, canResetPassword, ...props }: LoginProps) {
    const { data, ...form } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('login.store'), {
            onFinish: () => form.reset('password'),
            replace: true,
        });
    };

    return (
        <AuthLayout title="FISHING PASS" description="Inicia sesión en tu cuenta para continuar" className="w-full max-w-xs">
            <Head title="Iniciar sesión" />
            <form className="flex flex-col gap-6" onSubmit={submit} {...props}>
                <div className="grid gap-6 text-center">
                    <div className="grid gap-3">
                        <Label htmlFor="email" className={cn('gap-0', form.errors.email && 'text-destructive')}>
                            Correo electrónico<small>*</small>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            disabled={form.processing}
                            value={data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            className={cn(
                                '[&::-ms-reveal]:hidden',
                                form.errors.email &&
                                    'border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive',
                            )}
                            placeholder="email@correo.com"
                        />
                        <InputError message={form.errors.email} />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className={cn('gap-0', form.errors.password && 'text-destructive')}>
                                Contraseña<small>*</small>
                            </Label>
                            <a href="#" aria-disabled className="ml-auto text-sm underline-offset-4 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <InputPassword
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            error={form.errors.password}
                            disabled={form.processing}
                            tabIndex={2}
                            required
                            autoComplete="current-password"
                        />
                        <InputError message={form.errors.password} />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                            <Switch
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                tabIndex={3}
                                disabled={form.processing}
                                value={data.remember ? 'on' : 'off'}
                                onCheckedChange={(chk) => form.setData('remember', chk)}
                            />
                            <Label htmlFor="remember">Recuérdame</Label>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" tabIndex={4} disabled={form.processing}>
                        {form.processing && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
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
                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </form>
        </AuthLayout>
    );
}
