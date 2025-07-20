import PersonGender from '@/enums/person-gender.enum';
import { Filter } from '@/types/app.type';
import Person from './person.type';

export default interface PersonsPageFilters extends Filter<Person> {
    document_types?: number[];
    gender?: PersonGender;
}
