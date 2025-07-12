import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import PersonGender from '@/enums/person-gender.enum';
import { ListFilterIcon, ListFilterPlusIcon } from 'lucide-react';
import { usePersons } from '../../contexts/persons.context';

const genderOptions = [
    { value: null, label: 'Todos' },
    { value: PersonGender.MALE, label: 'Masculino' },
    { value: PersonGender.FEMALE, label: 'Femenino' },
];

export default function GenderFilter() {
    const { gender, handleSetGender } = usePersons();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none">
                    {gender ? <ListFilterIcon className="mr-1 h-4 w-4" /> : <ListFilterPlusIcon className="mr-1 h-4 w-4" />}
                    Género
                    {gender && (
                        <Badge variant="default" className="text-[0.65rem]">
                            {genderOptions.find((g) => g.value === gender)?.label}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {genderOptions.map((opt) => (
                    <DropdownMenuCheckboxItem
                        key={String(opt.value)}
                        checked={gender === opt.value}
                        onCheckedChange={() => handleSetGender(gender === opt.value ? null : opt.value)}
                    >
                        {opt.label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
