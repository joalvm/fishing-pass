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
        #[WithCast(EnumCast::class, RegistrationStatus::class)]
        public RegistrationStatus $status,
        public ?string $email,
        public ?string $address = null,
        public string|Optional|null $phone = null,
        #[MapName('approved_by')]
        public ?int $approvedBy = null,
        #[MapName('rejected_reason')]
        public ?string $rejectedReason = null,
        #[MapName('approved_at')]
        public ?string $approvedAt = null,
    ) {
    }
}
