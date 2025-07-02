import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ComponentProps, useState } from 'react';

interface InputPasswordProps extends Omit<ComponentProps<'input'>, 'type'> {
    error?: string | undefined;
}

export default function InputPassword({ error, ...props }: InputPasswordProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                type={visible ? 'text' : 'password'}
                className={cn(
                    '[&::-ms-reveal]:hidden',
                    !!error && 'border-destructive hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive',
                )}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn('hover:bg-input-hover focus:bg-input-focus absolute top-1/2 right-0.5 z-20 h-8 w-8 -translate-y-1/2', {
                    'text-destructive': !!error,
                })}
                onClick={() => setVisible((v) => !v)}
                tabIndex={-1}
            >
                {!visible ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
            </Button>
        </div>
    );
}
