<?php

namespace App\Enums\Person;

use Joalvm\Utils\Traits\ExtendsEnums;

enum Gender: string
{
    use ExtendsEnums;

    case FEMALE = 'FEMALE';
    case MALE = 'MALE';
}
