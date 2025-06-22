import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { GitCompareIcon } from 'lucide-react';
import { ComponentProps } from 'react';

export default function Login({ className, ...props }: ComponentProps<'form'>) {
    return (
        <AuthLayout title="FISHING PASS" description="Inicia sesión en tu cuenta para continuar" className="w-full max-w-xs">
            <form className={cn('flex flex-col gap-6', className)} {...props}>
                <div className="flex flex-col items-center gap-2 text-center"></div>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Usuario</Label>
                        <Input id="email" type="email" autoFocus placeholder="myusername" required />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password">Contraseña</Label>
                            <a href="#" aria-disabled className="ml-auto text-sm underline-offset-4 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                        <Input id="password" type="password" required />
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
        </AuthLayout>
    );
}
