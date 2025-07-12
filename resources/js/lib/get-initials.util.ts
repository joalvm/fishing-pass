import { Person } from "@/types/auth.type";

export default function getInitials(person: Person) {
    const names = (person.first_name + ' ' + person.last_name_paternal).trim().split(' ');

    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
}
