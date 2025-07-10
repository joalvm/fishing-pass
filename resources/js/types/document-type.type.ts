import CharType from '@/enums/char-type.enum';
import LengthType from '@/enums/length-type.enum';

interface DocumentType {
    id: number;
    name: string;
    abbr: string;
    length_type: LengthType;
    length: number;
    char_type: CharType;
}

export default DocumentType;
