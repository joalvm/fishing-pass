enum CompanyEntityType {
    JURIDICAL_PERSON = 'JURIDICAL_PERSON',
    NATURAL_PERSON = 'NATURAL_PERSON',
}

export function entityTypeLabel(type: CompanyEntityType) {
    switch (type) {
        case CompanyEntityType.JURIDICAL_PERSON:
            return 'Persona Jurídica';
        case CompanyEntityType.NATURAL_PERSON:
            return 'Persona Natural';
    }
}

export default CompanyEntityType;
