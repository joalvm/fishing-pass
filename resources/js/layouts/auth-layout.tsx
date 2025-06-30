import { useAppearance } from '@/hooks/use-appearance';
import AppLogo from '@/layouts/dashboard/components/sidebar/app-logo';
import { Moon, Sun } from 'lucide-react';
import React, { PropsWithChildren, useEffect, useState } from 'react';

interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
}

export default function AuthLayout({ children, title, description, ...props }: PropsWithChildren<AuthLayoutProps>) {
    const { appearance, updateAppearance } = useAppearance();

    // Carrusel de imágenes con información contextual
    const images = ['/ship_1.jpg', '/ship_2.jpg', '/ship_3.jpg'];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % images.length);
                setIsTransitioning(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="grid min-h-svh shadow-2xl inset-shadow-zinc-950 lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-2 md:p-5">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <AppLogo className="w-42" />
                    </a>
                    <button
                        onClick={() => updateAppearance(appearance === 'light' ? 'dark' : 'light')}
                        className="ml-auto rounded-md p-2 text-sm hover:bg-muted"
                        aria-label="Toggle appearance"
                    >
                        {appearance === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </button>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-6">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">{description}</p>
                    </div>
                    <div {...props}>{children}</div>
                </div>
            </div>
            {/* Panel Derecho - Carrusel de Imágenes */}
            <div className="relative hidden overflow-hidden bg-slate-900 lg:block">
                {/* Imagen de fondo con crossfade */}
                <div className="absolute inset-0">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                                index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                            }`}
                        >
                            <img src={image} className="h-full w-full object-cover" draggable={false} />
                        </div>
                    ))}
                </div>

                {/* Overlay con gradientes */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-slate-900/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                {/* Indicadores de navegación */}
                <div className="absolute right-8 bottom-8 flex gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentIndex(index);
                                    setIsTransitioning(false);
                                }, 300);
                            }}
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'scale-125 bg-white' : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Ir a imagen ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
