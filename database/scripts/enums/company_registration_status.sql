DROP TYPE IF EXISTS public."company_registration_status";

CREATE TYPE public."company_registration_status" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);

COMMENT ON TYPE public."company_registration_status"
IS 'Representa el estado de una solicitud de registro de empresa.';
