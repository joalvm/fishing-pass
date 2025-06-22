DROP TYPE IF EXISTS public."company_entity_type";

CREATE TYPE public."company_entity_type" AS ENUM (
    'JURIDICAL_PERSON',      -- Persona jurídica
    'NATURAL_PERSON'         -- Persona natural
);

COMMENT ON TYPE public."company_entity_type"
IS 'Tipo de entidad de la empresa. Puede ser una persona jurídica (empresa) o una persona natural (individuo).';
