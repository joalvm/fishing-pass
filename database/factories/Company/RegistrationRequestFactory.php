<?php

namespace Database\Factories\Company;

use App\Enums\Company\EntityType;
use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company\RegistrationRequest>
 */
class RegistrationRequestFactory extends Factory
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
            'entity_type' => EntityType::JURIDICAL_PERSON->value, // Default entity type
            'document_type_id' => DocumentType::query()->get()->random()->id,
            'document_number' => $this->faker->unique()->numerify('###########'),
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
        ];
    }

    public function juridicalPerson(): static
    {
        return $this->state([
            'business_name' => $this->faker->company,
            'entity_type' => EntityType::JURIDICAL_PERSON->value,
            'document_type_id' => 3,
            'document_number' => $this->faker->unique()->numerify('###########'),
        ]);
    }

    public function naturalPerson(): static
    {
        return $this->state([
            'business_name' => $this->faker->name,
            'entity_type' => EntityType::NATURAL_PERSON->value,
            'document_type_id' => 1,
            'document_number' => $this->faker->unique()->numerify('########'),
        ]);
    }
}
