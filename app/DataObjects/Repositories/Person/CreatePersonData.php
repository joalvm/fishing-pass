<?php

namespace App\DataObjects\Repositories\Person;

use App\Enums\Person\Gender;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class CreatePersonData extends Data
{
    public function __construct(
        #[MapName('document_type_id')]
        public int $documentTypeId,
        #[MapName('document_number')]
        public string $documentNumber,
        #[MapName('first_name')]
        public string $firstName,
        #[MapName('last_name_paternal')]
        public string $lastNamePaternal,
        #[MapName('gender')]
        #[WithCast(EnumCast::class, Gender::class)]
        public Gender $gender,
        public string $email,
        #[MapName('middle_name')]
        public string|Optional|null $middleName = null,
        #[MapName('last_name_maternal')]
        public string|Optional|null $lastNameMaternal = null,
        #[MapName('company_id')]
        public int|Optional|null $companyId = null,
        public string|Optional|null $phone = null,
        public bool $createUser = false,
    ) {
    }
}
