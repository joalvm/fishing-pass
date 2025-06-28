<?php

namespace Database\Seeders;

use App\Models\Person\Person;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $personModel = Person::factory()
            ->create([
                'company_id' => null, // No company for super admin
                'document_type_id' => 1, // Assuming 1 is the ID for a valid document type
                'document_number' => '99999999', // Example document number
                'first_name' => 'Super',
                'last_name_paternal' => 'Admin',
                'email' => 'sadmin@santamonica.com',
            ])
        ;

        $personModel->user()->create([
            'email' => $personModel->email,
            'password' => Hash::make('superadmin'),
            'email_verified_at' => now(),
            'enabled' => true,
            'is_super_admin' => true,
        ]);
    }
}
