<?php

namespace App\Enums\Company;

use Joalvm\Utils\Traits\ExtendsEnums;

/**
 * Enum que representa los tipos de entidades de una empresa.
 */
enum EntityType: string
{
    use ExtendsEnums;

    case JURIDICAL_PERSON = 'JURIDICAL_PERSON';
    case NATURAL_PERSON = 'NATURAL_PERSON';
}
