<?php

namespace App\Enums\Company;

use Joalvm\Utils\Traits\ExtendsEnums;

enum RegistrationStatus: string
{
    use ExtendsEnums;

    case PENDING = 'PENDING';
    case APPROVED = 'APPROVED';
    case REJECTED = 'REJECTED';
}
