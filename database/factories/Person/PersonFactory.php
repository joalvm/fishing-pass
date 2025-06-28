<?php

namespace Database\Factories\Person;

use App\Enums\Person\Gender;
use App\Models\Company\Company;
use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Person\Person>
 */
class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_id' => Company::factory(),
            'document_type_id' => DocumentType::query()->get()->random(),
            'document_number' => $this->faker->unique()->numerify('##########'),
            'first_name' => $this->faker->firstName(),
            'middle_name' => $this->faker->optional()->firstName(),
            'last_name_paternal' => $this->faker->lastName(),
            'last_name_maternal' => $this->faker->optional()->lastName(),
            'gender' => $this->faker->randomElement(Gender::values()),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->optional()->phoneNumber(),
        ];
    }
}
