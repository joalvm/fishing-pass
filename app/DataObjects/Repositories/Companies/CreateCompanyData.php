<?php

namespace App\DataObjects\Repositories\Companies;

use App\Enums\Company\EntityType;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class CreateCompanyData extends Data
{
    public function __construct(
        #[MapName('entity_type')]
        #[WithCast(EnumCast::class, EntityType::class)]
        public EntityType $entityType,
        #[MapName('business_name')]
        public string $businessName,
        #[MapName('document_type_id')]
        public int $documentTypeId,
        #[MapName('document_number')]
        public string $documentNumber,
        public string $email,
        public string $address,
        public string|Optional|null $phone = null,
        public bool $createUser = true,
    ) {
    }
}
