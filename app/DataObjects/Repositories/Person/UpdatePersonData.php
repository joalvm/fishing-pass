<?php

namespace App\DataObjects\Repositories\Person;

use App\Enums\Person\Gender;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdatePersonData extends Data
{
    public function __construct(
        #[MapName('document_type_id')]
        public int|Optional $documentTypeId,
        #[MapName('document_number')]
        public string|Optional $documentNumber,
        #[MapName('first_name')]
        public string|Optional $firstName,
        #[MapName('last_name_paternal')]
        public string|Optional $lastNamePaternal,
        #[MapName('gender')]
        #[WithCast(EnumCast::class, Gender::class)]
        public Gender|Optional $gender,
        public string|Optional|null $email,
        #[MapName('middle_name')]
        public string|Optional|null $middleName,
        #[MapName('last_name_maternal')]
        public string|Optional|null $lastNameMaternal,
        public string|Optional|null $phone,
    ) {
    }
}
