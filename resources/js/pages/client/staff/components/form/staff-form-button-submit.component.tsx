import { Button } from '@/components/ui/button';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, LoaderCircleIcon, SaveIcon } from 'lucide-react';

interface StaffFormButtonSubmitProps {
    recentlySuccessful: boolean;
    processing: boolean;
}

export default function StaffFormButtonSubmit({ recentlySuccessful, processing }: StaffFormButtonSubmitProps) {
    return (
        <div className="flex items-center justify-end gap-4">
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-green-500">
                    Completado <CheckCircleIcon className="inline h-4 w-4" />
                </p>
            </Transition>
            <Button disabled={processing} type="submit">
                Guardar
                {processing ? <LoaderCircleIcon className="animate-spin" /> : <SaveIcon />}
            </Button>
        </div>
    );
}
