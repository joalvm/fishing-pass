<?php

namespace App\DataObjects\Repositories\Companies;

use App\Enums\Company\EntityType;
use App\Enums\Company\RegistrationStatus;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class CreateRegistrationRequestData extends Data
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
        public string $address,
        #[WithCast(EnumCast::class, RegistrationStatus::class)]
        public RegistrationStatus|Optional $status,
        public string|Optional|null $phone,
        public Optional|string|null $email,
        #[MapName('approved_by')]
        public Optional|int|null $approvedBy,
        #[MapName('rejected_reason')]
        public Optional|string|null $rejectedReason,
        #[MapName('approved_at')]
        public Optional|string|null $approvedAt,
    ) {
    }
}
