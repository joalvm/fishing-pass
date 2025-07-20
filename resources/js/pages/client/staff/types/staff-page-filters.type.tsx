import { Filter } from '@/types/app.type';
import Person from './person.type';

export default interface StaffPageFilters extends Filter<Person> {
    document_types?: string[];
}
