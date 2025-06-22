<?php

namespace Database\Factories\Company;

use App\Enums\CompanyEntityType;
use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_name' => $this->faker->company,
            'entity_type' => CompanyEntityType::JURIDICAL_PERSON->value, // Default entity type
            'document_type_id' => DocumentType::query()->get()->random()->id,
            'document_number' => $this->faker->unique()->numerify('###########'),
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
        ];
    }
}
