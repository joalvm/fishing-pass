<?php

namespace Database\Seeders;

use App\Models\Company\RegistrationRequest;
use App\Models\Person\Person;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RegistrationRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 500) as $i) {
            $isJuridicalPerson = mt_rand(0, 1) === 1;

            if ($isJuridicalPerson) {
                RegistrationRequest::factory()->juridicalPerson()->create();
            } else {
                RegistrationRequest::factory()->naturalPerson()->create();
            }
        }
    }
}
