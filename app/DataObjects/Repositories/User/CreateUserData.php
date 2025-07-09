<?php

namespace App\DataObjects\Repositories\User;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;

class CreateUserData extends Data
{
    public function __construct(
        #[MapName('person_id')]
        public int $personId,
        public string $email,
        public string|null $password = null,
        #[MapName('avatar_url')]
        public string $avatarUrl = '',
        #[MapName('is_super_admin')]
        public bool $isSuperAdmin = false,
    ) {
    }
}
