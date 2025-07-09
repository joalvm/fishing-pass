enum RegistrationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export function RegistrationStatusLabel(status: RegistrationStatus) {
    switch (status) {
        case RegistrationStatus.PENDING:
            return 'Pendiente';
        case RegistrationStatus.APPROVED:
            return 'Aprobado';
        case RegistrationStatus.REJECTED:
            return 'Rechazado';
        default:
            return 'Desconocido';
    }
}

export default RegistrationStatus;
