export enum RegistrationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    INCOMPLETE = 'INCOMPLETE',
}

export const RegistrationStatusLabels: Record<RegistrationStatus, string> = {
    [RegistrationStatus.PENDING]: 'Pendiente',
    [RegistrationStatus.APPROVED]: 'Aprobado',
    [RegistrationStatus.REJECTED]: 'Rechazado',
    [RegistrationStatus.INCOMPLETE]: 'Incompleto',
};
