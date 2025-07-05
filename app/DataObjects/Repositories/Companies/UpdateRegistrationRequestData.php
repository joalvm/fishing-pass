<?php

namespace App\DataObjects\Repositories\Companies;

use App\Enums\Company\EntityType;
use App\Enums\Company\RegistrationStatus;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\EnumCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;

class UpdateRegistrationRequestData extends Data
{
    public function __construct(
        #[MapName('entity_type')]
        #[WithCast(EnumCast::class, EntityType::class)]
        public EntityType|Optional $entityType,
        #[MapName('business_name')]
        public string|Optional $businessName,
        #[MapName('document_type_id')]
        public int|Optional $documentTypeId,
        #[MapName('document_number')]
        public string|Optional $documentNumber,
        #[WithCast(EnumCast::class, RegistrationStatus::class)]
        public RegistrationStatus|Optional $status,
        public string|Optional|null $email,
        public string|Optional|null $address = null,
        public string|Optional|null $phone = null,
        #[MapName('approved_by')]
        public Optional|int|null $approvedBy = null,
        #[MapName('rejected_reason')]
        public Optional|string|null $rejectedReason = null,
        #[MapName('approved_at')]
        public Optional|string|null $approvedAt = null,
    ) {
    }
}
